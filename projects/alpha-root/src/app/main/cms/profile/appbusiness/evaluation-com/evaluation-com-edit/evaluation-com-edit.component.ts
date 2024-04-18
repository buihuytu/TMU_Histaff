import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup, AbstractControl } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, ICoreTableColumnItem, EnumCoreTablePipeType, AppService, DialogService, CoreFormService, AlertService, ResponseService, CustomValidators } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, map } from "rxjs";
import { ClassificationEditService } from "./classification-edit.service";

@Component({
  selector: "app-evaluation-com-edit",
  templateUrl: "./evaluation-com-edit.component.html",
  styleUrls: ["./evaluation-com-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})


export class EvaluationComEditComponent extends BaseEditComponent {
  override entityTable = 'HU_EVALUATION_COM';
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  loading: boolean = false;
  check: any[] = [];
  classification: any[] = [];
  

  // đây là chỗ để tạo ra Drop Down List xếp loại đánh giá-------

  // 1. cái thứ nhất (bắt buộc)
  // sau này bạn có thể đổi tên biến để tùy chỉnh
  xepLoaiDanhGiaGetByIdObject$ = new BehaviorSubject<any>(null);

  // 2. cái thứ hai (bắt buộc)
  // nhìn thấy SYS_OTHERLIST_READ
  // tức là phải tự chế API
  xepLoaiDanhGiaGetByIdApi = api.LAY_XEP_LOAI_DANH_GIA;


  // 3. cái thứ ba (bắt buộc)
  xepLoaiDanhGiaOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  //-------------------------------------------------------------

  
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  
  // api dùng để lấy tên
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;


  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  corePageListHeight!: number;
  workingId!: number;


  // khai báo thuộc tính preDefinedOuterParam$
  // để bấm vào cái input "chọn nhân viên"
  // thì chỉ lọc danh sách
  // các nhân viên là Đảng viên
  // để chọn thôi
  public preDefinedOuterParam$ = new BehaviorSubject<any>({
    // isMember là Đảng viên
    isMember: true


    // nếu bạn muốn lọc danh sách
    // cho cái Pop Up chọn nhân viên
    // thì thêm giá trị tương tự
    
    // ví dụ lấy cứng nhân viên
    // có tên là "Lường Trường Sâm"
    // thì fullName: "Lường Trường Sâm"
  })

  sections: ICoreFormSection[] =
    [
      {
        // comment cái tiêu đề này lại
        //caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_CONTRACT_APPENDIX,
        
        rows: [
          [
            {
              // đây là trường id bị ẩn

              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              // đây là trường mã nhân viên

              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_CODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              
              // thuộc tính "preDefinedOuterParam$" này
              // có tác dụng truyền
              // giá trị là "Đảng viên"
              // để cái Pop Up
              // chỉ hiển thị danh sách nhân viên "là Đảng viên"
              // cho người dùng chọn
              preDefinedOuterParam$: this.preDefinedOuterParam$,
              
              // cái API này
              // để khi bạn click đúp vào bản ghi
              // thì nó sẽ in ra đầy đủ họ tên theo mã nhân viên
              getByIdApi: this.employeeGetByIdApi,
              
              boundFrom: 'id',
              shownFrom: 'code',
              
              // chỗ này sửa code
              // để lấy được tên
              alsoBindTo: [
                { takeFrom: 'fullname', bindTo: 'fullName' },
                { takeFrom: 'memberPosition', bindTo: 'memberPosition' },
                { takeFrom: 'livingCell', bindTo: 'livingCell' }
              ],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly:true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              // đây là trường họ tên nhân viên

              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_NAME,
              field: 'fullName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường năm đánh giá

              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_YEAR,
              field: 'yearEvaluation',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ],
          [
            {
              // đây là trường chức vụ đảng

              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_POSITION_COMMUNIST,
              field: 'memberPosition',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              // đây là trường chi bộ sinh hoạt

              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_LIVING_AREA,
              field: 'livingCell',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              // đây là trường xếp loại đánh giá

              flexSize: 4,

              // dòng này có tác dụng
              // hiển thị ra chữ "Mức xếp loại"
              label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_EVALUATION_CATEGORY,
              
              // trường ở trong back end là classificationId
              field: 'classificationId',
              value: '',
              getByIdObject$: this.xepLoaiDanhGiaGetByIdObject$,
              
              // dòng code này
              // có tác dụng gọi API
              getByIdApi: this.xepLoaiDanhGiaGetByIdApi,
              
              // in cái trường "name" ra ngoài
              shownFrom: 'name',
              
              // dòng này có tác dụng
              // tạo ra Drop Down List
              controlType: EnumFormBaseContolType.DROPDOWN,
              
              // tạo ra option
              // đây mới là biến chứa dữ liệu
              // để tạo ra Drop Down List
              // nó được gán dữ liệu ở trong hàm ngOnInit()
              dropdownOptions$: this.xepLoaiDanhGiaOptions$,
              
              // đây là kiểu dữ liệu
              type: 'string',
              
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
          [
            {
              // đây là trường điểm đánh giá

              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_POINT_EVALUATION,
              field: 'pointEvaluation',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',

              // trường disabled
              // dùng để không cho nhập dữ liệu
              disabled: false,
              
              readonly: false,

              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },

              //   // tôi sẽ tạm thời comment cái validator
              //   // này lại

              //   {
              //     name: 'checkPointFrom',
              //     validator: EvaluationComEditComponent.checkInputPointFrom,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              //   },
              //   {
              //     name: 'checkPointTo',
              //     validator: EvaluationComEditComponent.checkInputPointTo,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              //   },
              // ]
            },
            {
              // đây là trường ghi chú

              flexSize: 8,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POINT,
              field: 'pointFrom',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              hidden: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POINT,
              field: 'pointTo',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              hidden: true
            },
          ]
        ]
      }

    ];

  columnsAllowance: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ALLOWANCE_ID,
      field: 'allowanceName',  // hiển thị cột này, muốn vậy phần BE cần join để lấy ra cột này
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_COEFFICIENT,
      field: 'coefficient',
      pipe: EnumCoreTablePipeType.NUMBER,
      type: 'number',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_EFFECTDATE,
      field: 'effectDate',
      pipe: EnumCoreTablePipeType.DATE,
      type: 'date',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_EXPIREDATE,
      field: 'expireDate',
      pipe: EnumCoreTablePipeType.DATE,
      type: 'date',
      align: 'left',
      width: 300,
    },
  ]

  huWorkingAllowList: any[] = [];

  constructor(
    private appService: AppService,
    public override dialogService: DialogService,
    private coreFormService: CoreFormService,
    private alertService: AlertService,
    private responseService: ResponseService,

    
    // viết code để tạo ra
    // Drop Down List xếp loại đánh giá
    // như này giống với tạo thuộc tính trong lập trình hướng đối tượng
    private classificationEditService: ClassificationEditService
  ) {
    super(dialogService);


    // đây là tiêu đề của trang web
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_EVALUATION_COM_EDIT;


    this.crud = {
      c: api.HU_EVALUATION_COM_CREATE,
      r: api.HU_EVALUATION_COM_READ,
      u: api.HU_EVALUATION_COM_UPDATE,
      d: api.HU_EVALUATION_COM_DELETE_IDS,
    };
  }


  ngOnInit(): void {
    const mainAppHeaderHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-header-height').replace('px', ''))
    const corePaginationHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-core-pagination-height').replace('px', ''))
    this.corePageListHeight = window.innerHeight - mainAppHeaderHeight - corePaginationHeight;

    this.loading = true;


    // đây là code
    // để tạo ra Drop Down List xếp loại đánh giá
    // gọi cái phương thức push()
    this.subsctiptions.push(
      // cái hàm getClassificationLevelList()
      // là tự viết đấy
      // bấm F12 để nhìn và học hỏi viết theo
      this.classificationEditService.layXepLoaiDanhGia()
        .pipe(
          map((f: any) => {
            // trong này nó viết
            // value: number
            // text: string
            const options: {
              value: number;
              text: string;
              pointFrom: number;
              pointTo: number
            }[] = [];
            
            f.body.innerBody.map((g: any) => {
              options.push({
                // tôi đoán đây là id
                // ở trong bảng SYS_OTHER_LIST
                // nếu tên trường của bạn khác
                // thì bạn sửa tên đi
                // tôi định dùng bảng HU_CLASSIFICATION
                // chắc tôi vẫn dùng chữ id nên không cần sửa
                value: g.id,

                // chỗ này chắc là name
                // trong bảng SYS_OTHER_LIST
                text: g.name,

                pointFrom: g.pointFrom,

                pointTo: g.pointTo
              })
            })


            // lấy dữ liệu cho cái mảng classification[]
            this.classification = options;


            return options;
          })
        )
        .subscribe(response => {
          // lấy cái dữ liệu trả về
          // gán vào xepLoaiDanhGiaOptions
          this.xepLoaiDanhGiaOptions$.next(response);
          this.loading = false;
        })
    );
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;


    this.subsctiptions.push(
      this.form.get('classificationId')?.valueChanges.subscribe(x => {
        // thông báo bạn đã thay đổi
        console.log("Bạn đã thay đổi xếp loại đánh giá FORM");


        // kiểm tra giá trị của classification
        console.log("kiểm tra giá trị của classification:\n", this.classification);


        if (!!x) {
          this.check = this.classification.filter(x2 => x2.value == x);

          this.form.get("pointTo")?.setValue(this.check[0].pointTo)

          this.form.get("pointFrom")?.setValue(this.check[0].pointFrom)
          
          if (!!!this.form.get("pointEvaluation")?.value) {
            this.form.get("pointEvaluation")?.enable()
          }
        }
      })!
    )

  }


  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }


  onBufferFormCreated(form: FormGroup) {
  }


  // khai báo phương thức tĩnh
  public static checkInputPointFrom(point: AbstractControl) {
    let errorMessage = "";
    let valid = true;
    const fromPoint = point.parent?.get("pointFrom")?.value
    const pointInput = point.value
    if (pointInput < fromPoint && point != null && fromPoint != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_EVALUATE_FROM_POINT_MORE_THAN_POINT
    }
    return CustomValidators.core("checkFromPoint", valid, errorMessage)(point)
  }


  // khai báo phương thức tĩnh
  public static checkInputPointTo(point: AbstractControl) {
    let errorMessage = "";
    let valid = true;
    const toPoint = point.parent?.get("pointTo")?.value
    const pointInput = point.value
    if (pointInput > toPoint && point != null && toPoint != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_EVALUATE_TO_POINT_MORE_THAN_POINT
    }
    return CustomValidators.core("checkToPoint", valid, errorMessage)(point)
  }
}
