import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, isDevMode } from '@angular/core';
import { ProfileInfoService } from '../profile-info.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { PersonnelCenterService } from '../../../personnel-center.service';


interface IEducation{
  educationLevel : string; //trình độ văn hóa
  learningLevel : string; //Trình độ học vấn
  qualification1 : string; // Trình độ chuyên môn 1
  qualification2 : string; // Trình độ chuyên môn 2
  qualification3 : string; // Trình độ chuyên môn 3
  trainingForm1 : string; //Hình thức đào tạo 1
  trainingForm2 : string; //Hình thức đào tạo 2
  trainingForm3 : string; //Hình thức đào tạo 3
  school1 : string; //trường học 1
  school2 : string; //trường học 2
  school3 : string; //trường học 3
  computerSkill : string;//trình  độ máy tính
  license : string;//bằng lái xe
  language1 : string; //ngoại ngữ 1
  language2 : string; //ngoại ngữ 2
  language3 : string; //ngoại ngữ 3
  languageLevel1 : string; // trình độ ngoại ngữ 1
  languageLevel2 : string; // trình độ ngoại ngữ 2
  languageLevel3 : string; // trình độ ngoại ngữ 3
}
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild('container') container!: ElementRef;
  @Output() heightTabEducation = new EventEmitter<number>();
  
  getPoliticalBackgroundApi: api = api.HU_EMPLOYEE_CV_GET_EDUCATION;
  data!: IEducation;
  boundSuccess!: boolean; 
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'educationLevel',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_EDUCATION_LEVEL,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'computerSkill',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'license',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LICENSE,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'languageLevelName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_LEVEL_ID,
          }
        ],
        [
          {
            // trình độ học vấn 1
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel1',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_1
          },
          {
            // trình độ chuyên môn 1
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification1',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_1,
          },
          {
            // hình thức đào tạo 1
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm1',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_1,
          },
          {
            // đơn vị đào tạo 1
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school1',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_1,
          }
        ],
        [
          {
            // trình độ học vấn 2
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel2',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_2
          },
          {
            // trình độ chuyên môn 2
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification2',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_2,
          },
          {
            // hình thức đào tạo 2
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm2',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_2,
          },
          {
            // đơn vị đào tạo 2
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school2',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_2,
          }
        ],
        [
          {
            // trình độ học vấn 3
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel3',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_3
          },
          {
            // trình độ chuyên môn 3
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification3',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_3
          },
          {
            // hình thức đào tạo 3
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm3',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_3
          },
          {
            // đơn vị đào tạo 3
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school3',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_3
          }
        ],
        [
          {
            // trình độ học vấn 4
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel4',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_4
          },
          {
            // trình độ chuyên môn 4
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification4',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_4
          },
          {
            // hình thức đào tạo 4
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm4',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_4
          },
          {
            // đơn vị đào tạo 4
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school4',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_4
          }
        ],
        [
          {
            // trình độ học vấn 5
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel5',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_5
          },
          {
            // trình độ chuyên môn 5
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification5',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_5
          },
          {
            // hình thức đào tạo 5
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm5',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_5
          },
          {
            // đơn vị đào tạo 5
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school5',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_5
          }
        ],
        [
          {
            // trình độ học vấn 6
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel6',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_6
          },
          {
            // trình độ chuyên môn 6
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification6',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_6
          },
          {
            // hình thức đào tạo 6
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm6',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_6
          },
          {
            // đơn vị đào tạo 6
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school6',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_6
          }
        ],
        [
          {
            // trình độ học vấn 7
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel7',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_7
          },
          {
            // trình độ chuyên môn 7
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification7',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_7
          },
          {
            // hình thức đào tạo 7
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm7',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_7
          },
          {
            // đơn vị đào tạo 7
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school7',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_7
          }
        ],
        [
          {
            // trình độ học vấn 8
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel8',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_8
          },
          {
            // trình độ chuyên môn 8
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification8',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_8
          },
          {
            // hình thức đào tạo 8
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm8',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_8
          },
          {
            // đơn vị đào tạo 8
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school8',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_8
          }
        ],
        [
          {
            // trình độ học vấn 9
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel9',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_9
          },
          {
            // trình độ chuyên môn 9
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification9',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_9
          },
          {
            // hình thức đào tạo 9
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm9',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_9
          },
          {
            // đơn vị đào tạo 9
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school9',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_9
          }
        ],
        [
          {
            // trình độ học vấn 10
            labelFlexSize: 0,
            flexSize: 3,
            field: 'learningLevel10',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_ID_10
          },
          {
            // trình độ chuyên môn 10
            labelFlexSize: 0,
            flexSize: 3,
            field: 'qualification10',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_LEVEL_TRAIN_10
          },
          {
            // hình thức đào tạo 10
            labelFlexSize: 0,
            flexSize: 3,
            field: 'trainingForm10',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_TYPE_TRAIN_10
          },
          {
            // đơn vị đào tạo 10
            labelFlexSize: 0,
            flexSize: 3,
            field: 'school10',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_EDUCATION_SCHOOL_ID_10
          }
        ]
      ]
    }
  ]

  static count_auto: number = 1;

  constructor(
    private profileInfoService: ProfileInfoService,
    public override mls: MultiLanguageService,
    public personnelCenterService: PersonnelCenterService,
    private appService: AppService,
    private alertService: AlertService,
    private responseService: ResponseService,
  ) { 
    super(mls)
  }


  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );

    // this is old code
    // if (EducationComponent.count_auto == 2) {

    if (EducationComponent.count_auto == 1) {

    this.subscriptions.push( // <== outer push
      this.personnelCenterService.employeeCv$.pipe(filter(cv => !!cv)).subscribe(x => {
        this.subscriptions.push( // <== inner push
          this.appService.get(this.getPoliticalBackgroundApi + "/" + x.id).subscribe(res => {
            if (res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200) {
                this.data = body.innerBody;
                // bind data to the items the sections
                
                // tính chiều cao tự động
                var e = 50;
                
                this.sections.map(section => {
                  section.rows.map(row => {
                    row.map(item => {
                      item.value = (this.data as any)[item.field]
                    })

                    // cộng chiều cao
                    e += 50;
                  })

                  
                  // code render auto "certificate record"
                  if (EducationComponent.count_auto == 2){
                  let index = 10;

                    while (index >= 1) {
                      if (
                        section.rows[index][2].value == undefined
                        || section.rows[index][2].value == null
                        || section.rows[index][2].value == ""
                      )
                      {
                        section.rows.pop();
                        
                        // khi tháo phần tử ra khỏi mảng
                        // thì trừ đi chiều cao
                        // của tab "trình độ học vấn"
                        e -= 50;
                      }
                      else
                      {
                        break;
                      }

                      index = index - 1;
                    }
                  }

                  // phát đi sự kiện (gửi chiều cao từ con cho cha)
                  this.heightTabEducation.emit(e);
                  
                  // tăng lên 1 để đếm vòng đời component
                  EducationComponent.count_auto = EducationComponent.count_auto + 1;
                  

                })

                this.boundSuccess = true;
              } else {
                if (isDevMode()) {
                  //this.responseService.resolve(body);
                }
              }
            } else {
              if (isDevMode()) {
                this.alertService.error(this.getPoliticalBackgroundApi + "/" + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )

    }

    
  }

  // tạo thuộc tính temp để lưu trữ
  public temp: any[] = [];
  
  ngAfterViewInit(): void {
    // get 10 record of certificate
    // this.personnelCenterService.employeeCv$
    // .pipe(filter(cv => !!cv))
    // .subscribe(x => {
    //   // x là 1 bản ghi trong bảng HU_EMPLOYEE_CV
    //   // console.log("robot: in ra x là cái gì?\n", x);

    //   this.subscriptions.push(
    //     this.appService
    //     .get(`/api/HuEmployeeCv/Get10RecordCertificate?employeeCvId=${x.id}`)
    //     .subscribe(data => {
    //       // in ra kết quả lấy được sau khi call API
    //       // console.log("robot: in ra kết quả lấy được sau khi call API:\n", data);

    //       if(this.temp.length == 0){
    //         this.temp.push(this.sections[0].rows[0]);
    //       }

    //       if(this.temp.length == 1){
    //         data.body.innerBody.forEach((element: any) => {
    //           this.temp.push(element);
    //         });

    //         // cập nhật lại cái "this.sections"
    //         this.sections[0].rows = this.temp;
    //       }
    //     })
    //   )
    // });
  }


  override ngOnDestroy(): void {
    EducationComponent.count_auto = 1;
    this.subscriptions.map(x => x?.unsubscribe());
  }
}
