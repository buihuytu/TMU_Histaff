import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkingBeforeService } from '../../working-before/working-before.edit.service';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, EnumCoreButtonVNSCode, IAlertOptions, ICoreFormSection, EnumFormBaseContolType, DialogService, AuthService, AppService, MultiLanguageService, UrlService, AlertService, CorePageEditComponent, TableCellPipe, TranslatePipe } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluate',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
    TranslatePipe,
    TableCellPipe,
  ],
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
})


export class EvaluateComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.SEND,
    EnumCoreButtonVNSCode.CANCEL
  ];

  override entityTable = 'PORTAL_REQUEST_CHANGE';

  showPopup!: boolean;
  record!: any;

  // thuộc tính fullName
  // để lưu tên người dùng
  public full_name!: any;

  // thuộc tính employeeId
  // để lưu id của nhân viên
  // lấy từ bảng HU_EMPLOYEE
  public employee_id!: any;


  // giúp làm việc
  // quản lý với luồng dữ liệu "data stream"
  // có câu nói: "Everything is a stream"
  public subscriptions: Subscription[] = [];


  // thuộc tính checkData
  // để thông báo trạng thái
  // nếu không có dữ liệu về kết quả đánh giá hàng năm thì checkData = true
  // nếu có dữ liệu về kết quả đánh giá hàng năm thì checkData = false
  public checkData: boolean = true;


  // tạo mảng
  // đặt tên là danh sách bản ghi
  // nó giống như kiểu tôi có 1 lớp đối tượng
  // bây giờ tôi muốn tạo 1 mảng cho loại lớp đối tượng này
  public list_records: {
    // trường 1:
    // id của chính cái bản ghi đấy
    // trong bảng HU_EVALUATE
    id: number,

    // trường 2:
    // loại đánh giá
    evaluateName: string,

    // trường 3:
    // mã nhân viên
    employeeCode: string,

    // trường 4:
    // họ tên nhân viên
    employeeName: string,

    // trường 5:
    // phòng ban
    orgName: string,

    // trường 6:
    // vị trí, chức danh
    positionName: string,

    // trường 7:
    // năm đánh giá
    year: number,

    // trường 8:
    // xếp loại đánh giá
    classificationName: string,

    // trường 9:
    // điểm đánh giá
    pointEvaluate: number,
  }[] = [];
  

  // khai báo thuộc tính popup
  public popup!: any;

  id!: number | any;
  content!: any;
  reason!: any;


  public alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };


  // đa ngôn ngữ
  public lang!: string;
  public checkedContent: boolean = true;
  public checkedReason: boolean = true;
  public contentChange: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_CONTENT_CHANGE;
  public required: EnumTranslateKey = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;
  public reasonChange: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REASON_CHANGE;
  public send: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_SEND_REQUEST;

  captionCode!: EnumTranslateKey;

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'number'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'sysOtherCode',
            value: '00050',
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'string'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'idChange',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'number'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'employeeId',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'number'
          }
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REASON_CHANGE,
            field: 'reasonChange',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            type: 'string'
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
            field: 'attachmentBuffer',
            value: null,
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'fileName',
            type: 'object',
          },
        ]
      ]
    }
  ];

  constructor(
    public override dialogService: DialogService,

    /*
      khai báo thuộc tính authService
      để đăng ký lấy dữ liệu
      bằng phương thức .subcribe()

      cụ thể:
      .data$.subcribe()

      vì lúc đăng nhập
      thì nó lấy được employee_id
    */
    private authService: AuthService,


    // tạo đối tượng appService
    // để sử dụng phương thức get()
    private appService: AppService,


    public mls: MultiLanguageService,

    public workingBeforeService: WorkingBeforeService,

    public urlService: UrlService,

    private alertService: AlertService
  )
  {
    super(dialogService);

    this.subscriptions.push(
      this.authService.data$.subscribe(
        (x) => {
          console.log(`bản ghi "data" được truyền đến EvaluateComponent:\n`, x);
  
          // lấy tên
          this.full_name = x?.fullName;
          
          // lấy id của nhân viên
          this.employee_id = x?.employeeId;
        }
      )
    )
    urlService.currentRouteUrl$.next('/profile/work-present')

    
    // sau khi lấy được cái x
    // rồi đem cái x?.employeeId
    // gán cho employee_id
    // bây giờ tôi sẽ call api để lấy
    // kết quả đánh giá hàng năm
    // với giá trị gửi đi là employee_id
    this.subscriptions.push(
      this.appService.get(api.HU_EVALUATE_GET_BY_EMPLOYEE_ID + `${this.employee_id}`).subscribe(
        (y) => {
          // cái y ở đây
          // là đối tượng được trả về
          // sau khi xử lý ở "back end"
          console.log("in ra y:\n", y);


          // gán dữ liệu gọi (invoke)
          // được từ api vào mảng
          y.body.innerBody.forEach((item: any) => {
            // xử lý null phòng ban
            // dùng toán tử nullish (??)
            if(item.orgName == null || item.orgName == undefined || item.orgName == ""){
              item.orgName = "Chưa có dữ liệu hiển thị";
            }
            

            // xử lý null chức danh
            if(item.positionName == null || item.positionName == undefined || item.positionName == ""){
              item.positionName = "Chưa có dữ liệu hiển thị";
            }
            
            
            // thêm dữ liệu vào mảng
            this.list_records.push(item);
          });


          console.log("Danh sách kết quả đánh giá hàng năm:\n", this.list_records);


          /*
            kiểm tra
            đếm xem có dữ liệu về
            kết quả đánh giá hàng năm không

            nếu innerBody != null
            thì có kết quả đánh giá hàng năm
          */
          if (y.body.innerBody.length > 0) {
            this.checkData = false;
          }
          else this.checkData = true;
        }
      )
    )
  }


  public ngOnInit(): void {
    this.popup = <HTMLInputElement>document.getElementById('popup1');
    console.log("Thử lấy cái pop up:\n", this.popup);
  }


  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.mls.lang$.subscribe((x: any) => (this.lang = x))
      );
    });
  }


  onFormCreated(e: FormGroup) {
    this.form = e;

    this.form.get('id')?.setValue(this.record.id);
    this.form.get('employeeId')?.setValue(this.record.employeeId);
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  onHandleItemClick(record: any) {
    this.record = record;
    // this.urlService.previousRouteUrl$.next("/profile/work-present/evaluate");

    this.showPopup = true;
  }

  onClickSubmit(event: any) {
    //LAM MUA LAM GIO O DAY

    if (!!event) {
      var payloadData = JSON.parse(event);

      payloadData.idChange = payloadData.id;
      payloadData.id = null;

      this.appService.post(api.PORTAL_REQUEST_CHANGE_SEND, payloadData).subscribe(x => {
        if (x.ok && x.status == 200) {
          // show alert success
          this.alertService.info(this.mls.trans(x.body.messageCode, this.lang), this.alertOptions);
        } else {
          // show alert fail
          this.alertService.info(this.mls.trans(x.body.messageCode, this.lang), this.alertOptions);
        }
      });

      this.showPopup = false;
    }
  }

  onClickCancel(event: any) {
    //LAM MUA LAM GIO O DAY

    this.showPopup = false;
  }
}
