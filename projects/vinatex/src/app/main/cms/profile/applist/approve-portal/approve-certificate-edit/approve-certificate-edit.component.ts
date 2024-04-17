import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseComponent, CorePageListService, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, IInOperator, ISortItem, MultiLanguageService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from "rxjs";


@Component({
  selector: 'app-approve-certificate-edit',
  templateUrl: './approve-certificate-edit.component.html',
  styleUrls: ['./approve-certificate-edit.component.scss']
})


export class ApproveCertificateEditComponent extends BaseComponent {
  // cái này là loại bằng cấp chứng chỉ
  @ViewChild('typeCertificateName') typeCertificateName!: TemplateRef<any>;
  typeCertificateNameTemplateRef!: TemplateRef<any>;


  // cái này là tên bằng cấp chứng chỉ
  @ViewChild('name') name!: TemplateRef<any>;
  nameTemplateRef!: TemplateRef<any>;


  // cái này là thời gian đào tạo từ
  @ViewChild('trainFromDateStr') trainFromDateStr!: TemplateRef<any>;
  trainFromDateStrTemplateRef!: TemplateRef<any>;


  // cái này là thời gian đào tạo đến
  @ViewChild('trainToDateStr') trainToDateStr!: TemplateRef<any>;
  trainToDateStrTemplateRef!: TemplateRef<any>;


  // cái này là ghi chú
  @ViewChild('remark') remark!: TemplateRef<any>;
  remarkTemplateRef!: TemplateRef<any>;

  // khai báo thuộc tính tiêu đề
  public title = EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_APPROVE_CERTIFICATE;


  // khai báo thuộc tính
  // để điều hướng đến Pop Up
  public editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };


  // khai báo thuộc tính API
  // để lấy tất cả bản ghi
  public apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CERTIFICATE_EDIT_QUERY_LIST,
  };


  // api xóa
  public crud: ICorePageListCRUD = {
    deleteIds: api.HU_CERTIFICATE_EDIT_DELETE_IDS,

    // phê duyệt
    toggleApproveIds: api.HU_CERTIFICATE_EDIT_APPROVE_RECORDS,

    // từ chối phê duyệt
    toggleUnapproveIds: api.HU_CERTIFICATE_EDIT_APPROVE_RECORDS
  };


  // khai báo thuộc tính "selectedIds"
  // để lưu mảng các id
  public selectedIds!: number[];

  headerFirstRowHeight: number = 60
  outerParam$ = new BehaviorSubject<any>(null);

  orgIds!: number[];

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];

  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  // khai báo thuộc tính
  // để tạo kiểu dữ liệu cho cột
  public columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      // trường 0:
      // id bị ẩn
      caption: EnumTranslateKey.UI_LABEL_HU_EMPLOYEE_CV_EDIT_EDUCATION_LEVEL,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 5
    },
    {
      // trường 1:
      // mã nhân viên
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80
    },
    {
      // trường 1,5:
      // trạng thái (BA yêu cầu thêm trường trạng thái)
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 120
    },
    {
      // trường 2:
      // tên nhân viên
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_NAME,
      field: 'employeeFullName',
      type: 'string',
      align: 'left',
      width: 240
    },
    {
      // trường 3:
      // phòng/ban
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      // trường 4:
      // chức danh
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      // trường 5:
      // loại bằng cấp/chứng chỉ
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPECERTIFICATENAME,
      field: 'typeCertificateName',
      type: 'string',
      align: 'center',
      width: 120,
      templateRef: this.typeCertificateNameTemplateRef
    },
    {
      // trường 6:
      // tên bằng cấp/chứng chỉ
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 150,
      templateRef: this.nameTemplateRef
    },
    {
      // trường 7:
      // thời gian đào tạo từ
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_FROM,
      field: 'trainFromDateStr',
      type: 'string',
      align: 'right',
      width: 100,
      templateRef: this.trainFromDateStrTemplateRef
    },
    {
      // trường 8:
      // thời gian đào tạo đến
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_TO,
      field: 'trainToDateStr',
      type: 'string',
      align: 'right',
      width: 120,
      templateRef: this.trainToDateStrTemplateRef
    }
  ];


  // hàm khởi tạo
  constructor(
    public override mls: MultiLanguageService,
    private router: Router,


    // khai báo thuộc tính "corePageListService"
    // để cập nhật lại lưới ở ngoài giao diện
    // sau khi 1 bản ghi được duyệt ấy
    // cụ thể: sử dụng "this.corePageListService.instances[0].reloadFlag$.value"
    // khi bạn phê duyệt thì cái value sẽ bị thay đổi
    // value thay đổi thì sẽ kích hoạt hàm change() kiểu kiểu thế
    // nếu bạn next cứng "true"
    // hoặc next cứng "false"
    // thì sẽ không thể cập nhật lưới
    // vì cơ chế của nó là bắt sự kiện thay đổi
    // cái "this.corePageListService.instances[0].reloadFlag$.value"
    public corePageListService: CorePageListService,


    // khai báo thuộc tính appService
    // để làm công việc get (hoặc post) API
    private appService: AppService
  ) {
    super(mls);
  }


  ngAfterViewInit(): void {
    this.columns.filter(c => c.field === 'typeCertificateName')[0].templateRef = this.typeCertificateName
    this.columns.filter(c => c.field === 'name')[0].templateRef = this.name
    this.columns.filter(c => c.field === 'trainFromDateStr')[0].templateRef = this.trainFromDateStr
    this.columns.filter(c => c.field === 'trainToDateStr')[0].templateRef = this.trainToDateStr
    this.columns.filter(c => c.field === 'remark')[0].templateRef = this.remark
  }


  // khai báo phương thức
  // public onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
  //   // in ra console log cái đối tượng "e"
  //   console.log("StaffProfileComponent onCorePageHeaderButtonClick", e);

  //   // vì bây giờ có toggleApproveIds
  //   // nên tôi ẩn cái switch... case... đi

  //   // switch (e.code) {
  //   //   case EnumCoreButtonVNSCode.HEADER_APPROVE:
  //   //     // viết code xử lý
  //   //     // khi bấm button duyệt

  //   //     console.log("bạn đã bấm duyệt");
  //   //     console.log("mảng selectedIds sau khi lấy được:\n", this.selectedIds);

  //   //     // post cái mảng id lên server
  //   //     this.appService.post(api.HU_CERTIFICATE_EDIT_APPROVE_RECORDS, this.selectedIds).subscribe(x => {

  //   //       // chỗ này là copy code
  //   //       if (x.ok && x.status === 200) {
  //   //         // khai báo biến "body"
  //   //         const body: IFormatedResponse = x.body

  //   //         if (body.statusCode === 200) {
  //   //           // sử dụng reloadFlag$
  //   //           // để cập nhật lưới ở ngoài giao diện

  //   //           // kiểu bản đầu có 4 bản ghi
  //   //           // sau khi phê duyệt 1 bản ghi
  //   //           // thì cập nhật lại cái lưới
  //   //           // để hiển thị ra 3 bản ghi

  //   //           this.corePageListService.instances[0].reloadFlag$.next(!this.corePageListService.instances[0].reloadFlag$.value)


  //   //           // sau khi post lên server thành công
  //   //           // thì xóa hết dữ liệu trong mảng chứa "id" đi
  //   //           this.selectedIds = [];
  //   //         }
  //   //         else {
  //   //           // ...
  //   //         }
  //   //       }
  //   //       else {
  //   //         // ...
  //   //       }

  //   //     });

  //   //     break;

  //   //   default:
  //   //     break;
  //   // }
  // }


  // khai báo phương thức onSelectedIdsChange()
  // để lấy mảng ở ngoài giao diện
  // chính là đối tượng "e"
  // lấy được rồi thì gán vào mảng "selectedIds"
  public onSelectedIdsChange(e: any) {
    // in ra console log cái "e"
    console.log("in ra đối tượng \"e\" khi bấm vào checkbox\n:", e);

    this.selectedIds = e;
  }
  // doubleClick(){
  //   this.router.navigateByUrl("/cms/profile/list/approve/approve-certificate-edit/approve-certificate-edit-detail")
  // }


  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
}
