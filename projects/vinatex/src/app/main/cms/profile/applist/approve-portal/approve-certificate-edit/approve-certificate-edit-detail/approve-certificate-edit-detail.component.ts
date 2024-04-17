import { Component, AfterViewInit } from '@angular/core';

// thêm mới thư viện
import { FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent, CoreFormService, DialogService, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { ClassificationEditService } from '../../../classification/edit/classification-edit.service';
import { CallDataService } from './call-data.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';



@Component({
  selector: 'app-approve-certificate-edit-detail',
  templateUrl: './approve-certificate-edit-detail.component.html',
  styleUrls: ['./approve-certificate-edit-detail.component.scss']
})


export class ApproveCertificateEditDetailComponent extends BaseEditComponent implements AfterViewInit {
  // ghi đè entityTable
  public override entityTable = 'HU_CERTIFICATE_EDIT';
  
  
  // khai báo thuộc tính
  // là mảng
  public subsctiptions: Subscription[] = [];
  
  
  // khai báo thuộc tính tiêu đề
  public captionCode: EnumTranslateKey = EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_APPROVE_CERTIFICATE_DETAIL;
  
  
  // khai báo thuộc tính
  public loading: boolean = false;



  // ---------------------- đây là chỗ để tạo ra Drop Down List trạng thái ----------------------

  // 1. cái thứ nhất (bắt buộc)
  // sau này bạn có thể đổi tên biến để tùy chỉnh
  trangThaiPheDuyetGetByIdObject$ = new BehaviorSubject<any>(null);

  // 2. cái thứ hai (bắt buộc)
  // nhìn thấy SYS_OTHERLIST_READ
  // tức là phải tự chế API
  trangThaiPheDuyetGetByIdApi = api.HU_CERTIFICATE_EDIT_STATUS_APPROVE;


  // 3. cái thứ ba (bắt buộc)
  trangThaiPheDuyetOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  //---------------------------------------------------------------------------------------------



  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  corePageListHeight!: number;


  // khai báo thuộc tính
  public sections: ICoreFormSection[] =
    [
      {
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
            {
              // đây là trường khóa ngoại bị ẩn
              // cụ thể ID_HU_CERTIFICATE
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'idHuCertificate',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true,
              type: 'number'
            },
          ],
          [
            {
              // đây là trường mã nhân viên
              flexSize: 3,
              label: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_EMPLOYEE_CODE,
              field: 'employeeCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường tên nhân viên
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_NAME,
              field: 'employeeFullName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường phòng ban
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ORG_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường chức danh
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_TITLE_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            }
          ],
          [
            {
              // đây là trường loại bằng cấp/chứng chỉ
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPECERTIFICATENAME,
              field: 'typeCertificateName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường tên bằng cấp/chứng chỉ
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường thời gian đào tạo từ
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_FROM,
              field: 'trainFromDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true
            },
            {
              // đây là trường thời gian đào tạo đến
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_TO,
              field: 'trainToDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true
            }
          ],
          [
            {
              // đây là trường ngày chứng chỉ có hiệu lực
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EFFECT_DATE,
              field: 'effectFrom',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true
            },
            {
              // đây là trường ngày chứng chỉ hết hiệu lực
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EXPIRE_DATE,
              field: 'effectTo',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true
            },
            {
              // đây là trường trình độ
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVEL,
              field: 'levelName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            // {
            //   // đây là trường chuyên môn
            //   flexSize: 3,
            //   label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MAJOR,
            //   field: 'major',
            //   value: '',
            //   controlType: EnumFormBaseContolType.TEXTBOX,
            //   type: 'text',
            //   disabled: true
            // },
            {
              // đây là trường trình độ chuyên môn
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVELTRAINNAME,
              field: 'levelTrainName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
          ],
          [
            {
              // đây là trường nội dung đào tạo
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
              field: 'contentTrain',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường "Trường đào tạo"
              flexSize: 3,
              label: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_SCHOOL_NAME,
              field: 'schoolName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường "Năm tốt nghiệp"
              flexSize: 3,
              label: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_YEAR,
              field: 'year',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              disabled: true
            },
            {
              // đây là trường "Điểm số"
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MARK,
              field: 'mark',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              disabled: true
            },
          ],
          [
            {
              // đây là trường "Xếp loại tốt nghiệp"
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CLASSIFICATION,
              field: 'classification',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường "Hình thức đào tạo"
              flexSize: 3,
              label: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_TYPE_TRAIN_NAME,
              field: 'typeTrainName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              // đây là trường "Là bằng chính"
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_IS_PRIME,
              field: 'isPrime',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              disabled: true
            }
          ],
          [
            {
              // đây là trường "Trạng thái"
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_STATUS,
              field: 'statusId',
              value: '',

              // sử dụng observable
              // cái này cảm giác hơi vô dụng tí
              // nhưng thiếu nó thì bị báo lỗi biên dịch
              getByIdObject$: this.trangThaiPheDuyetGetByIdObject$,

              // dòng code này
              // có tác dụng gọi API
              getByIdApi: this.trangThaiPheDuyetGetByIdApi,


              // in cái trường "name" ra ngoài
              shownFrom: 'name',

              // dòng này có tác dụng
              // tạo ra Drop Down List
              controlType: EnumFormBaseContolType.DROPDOWN,

              // tạo ra option
              // đây mới là biến chứa dữ liệu
              // để tạo ra Drop Down List
              // nó được gán dữ liệu ở trong hàm ngOnInit()
              // SAU KHI CALL API THÌ NÓ SẼ ĐỔ DỮ LIỆU VÀO trangThaiPheDuyetOptions$
              dropdownOptions$: this.trangThaiPheDuyetOptions$,

              // đây là kiểu dữ liệu
              type: 'string',
              
              disabled: false
            }
          ],
          [
            {
              // đây là trường "Lý cho không phê duyệt"
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_REASON,
              field: 'reason',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              disabled: false
            },
          ]
        ]
      }

    ];


  // hàm khởi tạo
  constructor (
    public override dialogService: DialogService,


    // viết code để tạo ra
    // Drop Down List trạng thái
    // như này giống với tạo thuộc tính trong lập trình hướng đối tượng
    private classificationEditService: ClassificationEditService,


    // khai báo thuộc tính
    private callDataService: CallDataService,


    // khai báo thuộc tính
    private coreFormService: CoreFormService
  )
  {
    super(dialogService);


    this.crud = {
      c: api.HU_EVALUATION_COM_CREATE,

      
      // cái này hoạt động là chính
      // chỉ ở trong màn hình phê duyệt bằng cấp chứng chỉ này
      // thì cái api r này
      // được dùng là chính
      // tại vì pop up này không được sửa và thêm
      r: api.HU_CERTIFICATE_EDIT_READ,
      

      u: api.HU_CERTIFICATE_EDIT_UPDATE,
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
      this.callDataService.layDanhSachTrangThai()
        .pipe(
          map((f: any) => {
            // trong này nó viết
            // value: number
            // text: string
            const options: { value: number; text: string; code: string}[] = [];
            
            f.body.innerBody.map((g: any) => {
              options.push({
                // tôi đoán đây là id
                // ở trong bảng SYS_OTHER_LIST
                // nếu tên trường của bạn khác
                // thì bạn sửa tên đi
                // tôi định dùng bảng HU_CLASSIFICATION
                // chắc tôi vẫn dùng chữ id nên không cần sửa
                value: g.id,

                code: g.code,

                // chỗ này chắc là name
                // trong bảng SYS_OTHER_LIST
                text: g.name
              })
            })
            return options;
          })
        )
        .subscribe(response => {
          // lấy cái dữ liệu trả về
          // gán vào trangThaiPheDuyetOptions
          this.trangThaiPheDuyetOptions$.next(response);
          this.loading = false;
        })
    );
  }


  onFormCreated(e: FormGroup): void {
    this.form = e;


    // in ra thông báo
    console.log("robot: lấy đối tượng Form\n", this.form);


    // bắt sự kiện trạng thái thay đổi
    console.log("robot: lấy ra cái text area\n", this.form.controls['reason']);


    // bắt sự kiện trạng thái
    // khi bạn thay đổi giá trị trong "text area"
    this.form.controls['reason'].valueChanges.subscribe((data: any) => {
      console.log("robot: bạn đã thay đổi text area:\n", data);
    });
  }


  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }


  // triển khai
  public ngAfterViewInit(): void {

    // bắt sự kiện khi thay đổit trạng thái
    this.subsctiptions.push(
      this.form.get('statusId')?.valueChanges.subscribe((x) => {
        if (!!x) {
          this.trangThaiPheDuyetOptions$
            .pipe(map((obj) => obj.find((obj) => obj.value === x)))
            .subscribe((res) => {
              // in ra xem res là cái gì
              // thật ra res là viết tắt của "response"
              console.log("robot: in ra xem res (response) là cái gì?\n", res);


              // lấy ra đối tượng "text area"
              // cụ thể: nó là "reason"
              var dt_textArea = this.coreFormService.getFormBaseControlByName(this.sections, "reason");


              // in ra phần tử dt_textArea
              console.log("robot: in ra phần tử dt_textArea:\n", dt_textArea);


              if (res?.code == 'DD' || res?.code == 'CD' || res?.code == null) {
                if (!!dt_textArea) {
                  // nếu người dùng chọn "Đã phê duyệt"
                  // thì ẩn cái "text area" đi
                  dt_textArea.hidden = true;

                  // employeeConcurrentId.flexSize = 3;
                  // this.form.get("employeeConcurrentId")?.patchValue("");
                }
              }
              if (res?.code == 'TCPD') {
                if (!!dt_textArea) {
                  // nếu người dùng chọn "Không phê duyệt"
                  // thì hiện cái "text area" ra
                  dt_textArea.hidden = false;
                }
              }

            });
        
        // chỗ này là kết thúc câu điều kiện if
        }

      })!
    );
  }
}
