import { Component } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, CoreFormService, AppService, CustomValidators } from 'ngx-histaff-alpha';
import { HuEvaluateEditService } from './hu-evaluate-edit.service';

@Component({
  selector: 'app-hu-evaluate-edit',
  templateUrl: './hu-evaluate-edit.component.html',
  styleUrls: ['./hu-evaluate-edit.component.scss'],
})
export class HuEvaluateEditComponent extends BaseEditComponent {
  check: any[] = [];
  pointFrom!: number;
  pointTo!: number;
  evaluateTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  reviewTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  reviewTypeGetByIdApi = api.SYS_OTHERLIST_READ;
  point!: number;
  classificationOptions$ = new BehaviorSubject<any[]>([]);
  classificationGetByIdObject$ = new BehaviorSubject<any>(null);
  classificationGetByIdApi = api.HU_CLASSIFICATION_READ;

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  concurrentlyGetByIdObject$ = new BehaviorSubject<any>(null);
  concurrentlyGetByIdApi = api.HU_CONCURRENTLY_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  employeeConcurrentGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeConcurrentGetByIdApi = api.HU_CONCURRENTLY_GET_EMPLOYEE_BY_CONCURRENT;
  subsctiptions: Subscription[] = [];
  loading: boolean = false;
  override entityTable = 'HU_EVALUATE';
  crud!: ICorePageEditCRUD;
  captionCode!: EnumTranslateKey;
  
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            hidden: true,
          },
        ],
        [
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_EVALUATE_TYPE,
            field: 'evaluateType',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.reviewTypeGetByIdObject$,
            getByIdApi: this.reviewTypeGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.evaluateTypeOptions$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POSITION_NAME,
            field: 'orgId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            hidden: true,
            readonly: true,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_YEAR,
            field: 'year',
            value: null,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            validators: [
              {
                name: "validators",
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
              }
            ]

          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_CLASSIFICATION,
            field: 'classificationId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.classificationGetByIdObject$,
            getByIdApi: this.classificationGetByIdApi,
            shownFrom: 'classificationLevelName',
            dropdownOptions$: this.classificationOptions$,
            validators: [
              {
                name: "validators",
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
              }
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POINT,
            field: 'point',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            disabled: true
          },

        ],
        [
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_CONCURRENT_POSITION_CHOOSE,
            field: 'employeeConcurrentId',
            value: [],
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.POSITION_CONCURRENT_SEEK,
            getByIdObject$: this.employeeConcurrentGetByIdObject$,
            getByIdApi: this.employeeConcurrentGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'employeeCode',
            alsoBindTo: [
              { takeFrom: 'orgConcurrentName', bindTo: 'orgConcurrentName' },
              { takeFrom: 'positionConcurrentName', bindTo: 'positionConcurrentName' },
              { takeFrom: 'employeeCode', bindTo: 'employeeCode' },
              { takeFrom: 'employeeName', bindTo: 'employeeConcurrentName' },
              { takeFrom: 'orgId', bindTo: 'orgId' },
            ],
            type: 'object',
            readonly: true,
            hidden: true,

          },
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_EMPOYEE_NAME,
            field: 'employeeConcurrentName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            hidden: true
          },
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_CONCURENT_NAME,
            field: 'positionConcurrentName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            hidden: true
          },
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_ORG_CONCURRENT_NAME,
            field: 'orgConcurrentName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            hidden: true
          },

        ],
        [
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POSITION_CHOOSE,
            field: 'employeeId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            getByIdObject$: this.employeeGetByIdObject$,
            getByIdApi: this.employeeGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'code',
            alsoBindTo: [
              { takeFrom: 'fullname', bindTo: 'employeeName' },
              { takeFrom: 'orgName', bindTo: 'orgName' },
              { takeFrom: 'positionName', bindTo: 'positionName' },
              { takeFrom: 'code', bindTo: 'employeeCode' },
              { takeFrom: "orgId", bindTo: "orgId" }
            ],
            type: 'text',
            hidden: true
          },
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_EMPOYEE_NAME,
            field: 'employeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            hidden: true
          },
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_ORG_NAME,
            field: 'orgName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            hidden: true
          },
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POSITION_NAME,
            field: 'positionName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            hidden: true
          },

        ],
        // [
        //   {
        //     flexSize: 3,
        //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POINT,
        //     field: 'pointFrom',
        //     value: null,
        //     controlType: EnumFormBaseContolType.TEXTBOX,
        //     type: 'number',
        //     hidden: true
        //   },
        //   {
        //     flexSize: 3,
        //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POINT,
        //     field: 'pointTo',
        //     value: null,
        //     controlType: EnumFormBaseContolType.TEXTBOX,
        //     type: 'number',
        //     hidden: true
        //   },
        // ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            type: 'text',
          },
        ],
      ],
    },
  ];
  classification: any[] = [];

  constructor(
    public override dialogService: DialogService,
    private huEvaluateEditService: HuEvaluateEditService,
    private coreFormService: CoreFormService,
    private appService: AppService

  ) {
    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE;
    this.crud = {
      c: api.HU_EVALUATE_CREATE,
      r: api.HU_EVALUATE_READ,
      u: api.HU_EVALUATE_UPDATE,
      d: api.HU_EVALUATE_DELETE_IDS,
    };
  }
  checkPoint(x: any) {
    let errorMessage = ''
    return CustomValidators.core("checkPointFrom", false, errorMessage)
  }
  onFormCreated(e: FormGroup): void {
    this.form = e as FormGroup;

    // this.subsctiptions.push(
    //   this.form.get('classificationId')?.valueChanges.subscribe(x => {
    //     if (!!x) {
    //       this.check = this.classification.filter(x2 => x2.value == x)
    //       this.form.get("pointTo")?.setValue(this.check[0].pointTo)

    //       this.form.get("pointFrom")?.setValue(this.check[0].pointFrom)
    //       if (!!!this.form.get("point")?.value) {
    //         this.form.get("point")?.enable()
    //       }
    //     }
    //   })!
    // )
    if (!!this.form.get("id")?.value) {
      const classificationId = this.form.get("classificationId")?.value
      this.appService.get(api.HU_CLASSIFICATION_GET_BY_ID + classificationId)
        .subscribe((x: any) => {
          let resObj = x.body.innerBody;
          // this.form.get("pointFrom")?.setValue(resObj.pointFrom)
          // this.form.get("pointTo")?.setValue(resObj.pointTo)
        })
      const employeeId = this.form.get("employeeId")?.value
      // this.appService.get(api.HU_EMPLOYEE_GET_BY_ID + employeeId)
      //   .subscribe((x: any) => {
      //     let resObj = x.body.innerBody;
      //     let employeeObj = {
      //       id: resObj.id,
      //       employeeCode: resObj.code
      //     }
      //     this.employeeGetByIdObject$.next(employeeObj)
      //   })
    }
  }

  static checkInputPointFrom(point: AbstractControl) {
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
  static checkInputPointTo(point: AbstractControl) {
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
  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.huEvaluateEditService
        .getAllEvaluate()
        .pipe(
          map((f: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            f.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.evaluateTypeOptions$.next(response);
          this.loading = false;
        }),
    )

  }

  ngAfterViewInit(): void {
    this.subsctiptions.push(
      this.form.get('evaluateType')?.valueChanges.subscribe((x) => {
        if (!!x) {
          this.evaluateTypeOptions$
            .pipe(map((obj) => obj.find((obj) => obj.value === x)))
            .subscribe((res) => {
              var employeeConcurrentId = this.coreFormService.getFormBaseControlByName(this.sections, "employeeConcurrentId");
              var employeConcurrentName = this.coreFormService.getFormBaseControlByName(this.sections, "employeeConcurrentName");
              var positionConcurrentName = this.coreFormService.getFormBaseControlByName(
                this.sections, "positionConcurrentName");
              var orgConcurrentName = this.coreFormService.getFormBaseControlByName(this.sections, "orgConcurrentName");
              var orgConcurrentName = this.coreFormService.getFormBaseControlByName(this.sections, "orgConcurrentName");
              var employeeId = this.coreFormService.getFormBaseControlByName(
                this.sections, "employeeId");
              var employeeName = this.coreFormService.getFormBaseControlByName(this.sections, "employeeName");
              var orgName = this.coreFormService.getFormBaseControlByName(this.sections, "orgName");
              var orgName = this.coreFormService.getFormBaseControlByName(this.sections, "orgName");
              var position = this.coreFormService.getFormBaseControlByName(
                this.sections,
                'positionName'
              );
              if (res?.code == 'LXL02') {
                if (!!employeeConcurrentId) {
                  employeeConcurrentId.hidden = false;
                  employeeConcurrentId.flexSize = 3;
                  this.form.get("employeeConcurrentId")?.patchValue("");
                }
                if (!!employeConcurrentName) {
                  employeConcurrentName.hidden = false;
                  employeConcurrentName.flexSize = 3;
                  this.form.get("employeeConcurrentName")?.patchValue("");
                }
                if (!!positionConcurrentName) {
                  positionConcurrentName.hidden = false;
                  positionConcurrentName.flexSize = 3;
                  this.form.get("positionConcurrentName")?.patchValue("");
                }
                if (!!orgConcurrentName) {
                  orgConcurrentName.hidden = false;
                  orgConcurrentName.flexSize = 3;
                  this.form.get("orgConcurrentName")?.patchValue("");
                }
                if (!!employeeId) {
                  employeeId.hidden = true;
                  employeeId.flexSize = 0;
                  this.form.get("employeeId")?.patchValue("")
                }
                if (!!employeeName) {
                  employeeName.hidden = true;
                  employeeName.flexSize = 0;
                  this.form.get("employeeName")?.patchValue("");
                }
                if (!!position) {
                  position.hidden = true;
                  position.flexSize = 0;
                  this.form.get('positionName')?.patchValue('');
                }
                if (!!orgName) {
                  orgName.hidden = true;
                  orgName.flexSize = 0;
                  this.form.get("orgName")?.patchValue("");
                }
                this.subsctiptions.push(
                  this.huEvaluateEditService.getReprensentative().pipe(
                    map((x: any) => {
                      this.form.get("point")?.enable()
                      const options: { value: string; text: string; code: string; pointFrom: number; pointTo: number }[] = [];
                      x.body.innerBody.map((y: any) => {
                        options.push({
                          value: y.id,
                          text: y.classificationLevelName,
                          code: y.code,
                          pointFrom: y.pointFrom,
                          pointTo: y.pointTo
                        });
                      });
                      return options;
                    })
                  )
                    .subscribe((response) => {
                      this.classification = response

                      this.classificationOptions$.next(response);
                      this.loading = false;
                    }),
                )

              } else if (res?.code == 'LXL01') {
                if (!!employeeId) {
                  employeeId.hidden = false;
                  employeeId.flexSize = 3;
                  this.form.get("employeeId")?.patchValue("");
                }
                if (!!employeeName) {
                  employeeName.hidden = false;
                  employeeName.flexSize = 3;
                }

                if (!!position) {
                  position.hidden = false;
                  position.flexSize = 3;
                  this.form.get('positionName')?.patchValue('');
                }

                if (!!orgName) {
                  orgName.hidden = false;
                  orgName.flexSize = 3;
                  this.form.get("orgName")?.patchValue("");
                }
                if (!!employeeConcurrentId) {
                  employeeConcurrentId.hidden = true;
                  employeeConcurrentId.flexSize = 0;
                  this.form.get("employeeConcurrentId")?.patchValue("");
                }
                if (!!employeConcurrentName) {
                  employeConcurrentName.hidden = true;
                  employeConcurrentName.flexSize = 0;
                }
                if (!!positionConcurrentName) {
                  positionConcurrentName.hidden = true;
                  positionConcurrentName.flexSize = 0;
                }
                if (!!orgConcurrentName) {
                  orgConcurrentName.hidden = true;
                  orgConcurrentName.flexSize = 0;
                  this.form.get("orgConcurrentName")?.patchValue("")
                }
                this.subsctiptions.push(
                  this.huEvaluateEditService.getSatffAssessment().pipe(
                    map((x: any) => {
                      this.form.get("point")?.enable()
                      const options: { value: string; text: string; code: string; pointFrom: number; pointTo: number }[] = [];
                      x.body.innerBody.map((y: any) => {
                        options.push({
                          value: y.id,
                          text: y.classificationLevelName,
                          code: y.code,
                          pointFrom: y.pointFrom,
                          pointTo: y.pointTo
                        });
                      });
                      return options;
                    })
                  )
                    .subscribe((response) => {
                      this.classification = response

                      this.classificationOptions$.next(response);
                      this.loading = false;
                    })

                )
              }
            });
        }
      })!,
    );
    if (this.huEvaluateEditService.employeeConcurrentId != null) {
      this.subsctiptions.push(
        this.appService.get(api.HU_CONCURRENTLY_GET_EMPLOYEE_BY_CONCURRENT + `?id=${this.huEvaluateEditService.employeeConcurrentId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              let resObj = x.body.innerBody;
              let empConObj = {
                id: resObj[0].id,
                employeeCode: resObj[0].employeeCode,
                employeeConcurrentName: resObj[0].employeeName
              }
              this.employeeConcurrentGetByIdObject$.next(empConObj)

            }
          }),

      );
    }
    if (this.huEvaluateEditService.employeeId != null) {
      this.subsctiptions.push(
        this.appService.get(api.HU_EMPLOYEE_READ + `?id=${this.huEvaluateEditService.employeeId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              let resObject = x.body.innerBody;
              let empObj = {
                id: resObject.id,
                code: resObject.code,
              }
              this.employeeGetByIdObject$.next(empObj)
            }
          })
      )
    }
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }


}
