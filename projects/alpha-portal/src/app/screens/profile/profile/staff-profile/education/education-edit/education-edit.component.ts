import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TransportDataService } from '../transport-data.service';
import { BehaviorSubject, Subscription } from "rxjs";
import { CertificateService } from '../../../certificate/certificate.service';
import { FormGroup } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, ICorePageEditCRUD, UrlService, AppService, DialogService, IFormatedResponse } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.scss']
})


export class EducationEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  public loading: boolean = false;
  
  
  // tạo thuộc tính receive_data
  // để nhận dữ liệu
  // từ trang chính education
  public receive_data: any;

  public subsctiptions: Subscription[] = [];

  
  // khai báo thuộc tính
  // cho trình độ văn hóa
  public sysOtherlistGetByIdObject1$ = new BehaviorSubject<any>(null);
  public sysOtherlistGetByIdApi1 = api.SYS_OTHERLIST_READ;
  public dropdown_educationLevel$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // khai báo thuộc tính
  // cho hình thức đào tạo 2
  public sysOtherlistGetByIdObject7$ = new BehaviorSubject<any>(null);
  public sysOtherlistGetByIdApi7 = api.SYS_OTHERLIST_READ;
  public dropdown_computerSkillId$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // khai báo thuộc tính
  // cho hình thức đào tạo 3
  public sysOtherlistGetByIdObject8$ = new BehaviorSubject<any>(null);
  public sysOtherlistGetByIdApi8 = api.SYS_OTHERLIST_READ;
  public dropdown_licenseId$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  
  // khai báo thuộc tính
  public sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            // id cv của nhân viên
            // bị ẩn trên form
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "id",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: "text",
          },
          {
            // id nhân viên (bị ẩn trên form)
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "employeeId",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: "text",
          },
          {
            // cái này để truyền vào DB
            // truyền cứng là IS_SEND_PORTAL = true
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "isSendPortal",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: "text",
          },
          {
            // cái này để truyền vào DB
            // truyền cứng là IS_APPROVED_PORTAL = false
            flexSize: 1,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "isApprovedPortal",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: "text",
          },
          {
            // cái này là ID của bảng chính nếu có
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "huEmployeeCvId",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: "number",
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "isSaveEducation",
            value: "",
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: true,
            hidden: true,
            type: "boolean",
          }
        ],
        [
          {
            // Trình độ văn hóa
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_EDUCATION_LEVEL,
            field: "educationLevelId",
            value: "",
            getByIdObject$: this.sysOtherlistGetByIdObject1$,
            getByIdApi: this.sysOtherlistGetByIdApi1,
            shownFrom: "name",
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.dropdown_educationLevel$,
            type: "text",
          },
          {
            // Trình độ tin học
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
            field: "computerSkillId",
            value: "",
            getByIdObject$: this.sysOtherlistGetByIdObject7$,
            getByIdApi: this.sysOtherlistGetByIdApi7,
            shownFrom: "name",
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.dropdown_computerSkillId$,
            type: "text",
          },
          {
            // Bằng lái xe
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LICENSE,
            field: "licenseId",
            value: "",
            getByIdObject$: this.sysOtherlistGetByIdObject8$,
            getByIdApi: this.sysOtherlistGetByIdApi8,
            shownFrom: "name",
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.dropdown_licenseId$,
            type: "text",
          }
        ]
      ],
    },
  ];


  // khai báo thuộc tính
  public crud!: ICorePageEditCRUD;


  // khai báo thuộc tính
  public override entityTable = "HU_EMPLOYEE_CV_EDIT";


  // hàm khởi tạo
  constructor(
    // nhận dữ liệu từ trang education
    // cái này tôi tự tạo class service
    private transportDataService: TransportDataService,
    private urlService: UrlService,
    private appService: AppService,
    public override dialogService: DialogService,
    public certificateService: CertificateService,
  )
  {
    super(dialogService);
    this.crud = {
      c: api.HU_EMPLOYEE_CV_EDIT_CREATE,
      r: api.HU_EMPLOYEE_CV_EDIT_READ,
      u: api.HU_EMPLOYEE_CV_EDIT_CREATE,
      d: api.HU_EMPLOYEE_CV_EDIT_DELETE,
      s: api.HU_EMPLOYEE_CV_EDIT_SAVE_EDUCATION
    };
    
  }
  ngOnDestroy(): void {
    this.urlService.currentRouteUrl$.next('profile/staff-profile/education')
  }


  ngOnInit(): void {
    // nhận dữ liệu từ trang education
    this.transportDataService.transportData$.subscribe((thamSo: any) => {
      this.receive_data = thamSo;

      console.log("Nhận dữ liệu từ education:\n", this.receive_data);
    });
    
    
    // vì lúc bấm lưu
    // nó bị bay về trang chủ
    // nên cần dòng code này để fix
    this.urlService.previousRouteUrl$.next('/profile/staff-profile/education');


    this.loading = true;


    // lấy dữ liệu cho Drop Down List
    // trình độ văn hóa
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "EDUCATION_LEVEL")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              }
              );
              this.dropdown_educationLevel$.next(options);
              // END ONE LOGIC
            }
          }
        })
    );


    // lấy dữ liệu cho Drop Down List
    // Trình độ tin học
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "RC_COMPUTER_LEVEL")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              }
              
              );
              this.dropdown_computerSkillId$.next(options);
              // END ONE LOGIC
            }
          }
        })
    );


    // lấy dữ liệu cho Drop Down List
    // Bằng lái xe
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "BLX")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              }
              
              );
              this.dropdown_licenseId$.next(options);
              // END ONE LOGIC
            }
          }
        })
    );
  }


  // khai báo phương thức
  public onFormCreated(e: FormGroup): void {
    /*
      GET FormGroup Instance
      là lấy thể hiện của form
    */

    // gán dữ liệu cho form
    // "form" là thuộc tính được khai báo ở lớp cha
    this.form = e;


    // điền dữ liệu vào thẻ input của form
    // cụ thể: dùng đối tượng "receive_data"


    // điền (fill) dữ liệu cho id
    this.form.get("id")?.setValue(this.receive_data.id);


    // điền dữ liệu cho "trình độ văn hóa"
    this.form.get("educationLevelId")?.setValue(this.receive_data.educationLevelId);

    // điền dữ liệu cho "Trình độ tin học"
    this.form.get("computerSkillId")?.setValue(this.receive_data.computerSkillId);

    // điền dữ liệu cho "Bằng lái xe"
    this.form.get("licenseId")?.setValue(this.receive_data.licenseId);

    // điền dữ liệu cho "Id của bảng HU_EMPLOYEE"
    this.form.get("employeeId")?.setValue(this.receive_data.employeeId);

    // điền dữ liệu cho "IS_SEND_PORTAL"
    // điền cứng giá trị "true" luôn
    this.form.get("isSendPortal")?.setValue(this.receive_data.isSendPortal);

    // điền dữ liệu cho "IS_APPROVED_PORTAL"
    // điền cứng giá trị "false" luôn
    this.form.get("isApprovedPortal")?.setValue(this.receive_data.isApprovedPortal);


    this.form.get("isSaveEducation")?.setValue(this.receive_data.isSaveEducation);


    // điền dữ liệu cho "HU_EMPLOYEE_CV_ID"
    this.form.get("huEmployeeCvId")?.setValue(this.receive_data.huEmployeeCvId);
  }


  // khai báo phương thức
  public onFormReinit(e: string): void {
    /*
      To allow form to be deactivated
      là để cho phép "form" bị vô hiệu hóa
    */

    this.formInitStringValue = e;
  }


  public ngAfterViewInit(): void {
    // ...
  }
}
