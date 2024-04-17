import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { Router } from '@angular/router';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { PersonnelCenterService } from '../../../personnel-center.service';

@Component({
  selector: 'app-concurrent-position-edit',
  templateUrl: './concurrent-position-edit.component.html',
  styleUrls: ['./concurrent-position-edit.component.scss']
})
export class ConcurrentPositionEditComponent extends BaseEditComponent implements OnInit {

  override entityTable = "HU_CONCURRENTLY";

  subscriptions: Subscription[] = []
  orgGetById$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  positionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  positionGetById$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  positionPoliticalOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  positionPoliticalGetById$ = new BehaviorSubject<any>(null);
  positionPoliticalGetByIdApi = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_CONCURRENTLY_EDIT;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'employeeId',
              value: this.personnelCenterService.employee$.getValue().id,
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
              field: 'orgId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              objectList$: new BehaviorSubject<any[]>([]),

              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
              getByIdObject$: this.orgGetById$,
              getByIdApi: this.orgGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              // alsoBindTo: [
              // { takeFrom: 'companyNameVn', bindTo: 'company' },
              // {takeFrom : 'address', bindTo : 'workingAddress'},
              // { takeFrom: 'orgId', bindTo: 'orgId' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_POSTION_TITLE,
              field: 'positionId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              boundFrom: 'id',
              dropdownOptions$: this.positionOptions$,
              getByIdObject$: this.positionGetById$,
              getByIdApi: this.positionGetByIdApi,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_DECISION_NO,
              field: 'decisionNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_EFFECTIVE_DATE,
              field: 'effectiveDate',
              value: '',
              type: 'date',
              controlType: EnumFormBaseContolType.DATEPICKER,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_EXPIRATION_DATE,
              field: 'expirationDate',
              value: '',
              type: 'date',
              controlType: EnumFormBaseContolType.DATEPICKER,
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   }
              // ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_POSTION_POLITICAL_NAME,
              field: 'positionPoliticalId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              boundFrom: 'id',
              dropdownOptions$: this.positionPoliticalOptions$,
              getByIdObject$: this.positionPoliticalGetById$,
              getByIdApi: this.positionPoliticalGetByIdApi,
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_SIGNING_DATE,
              field: 'signingDate',
              type: 'date',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   }
              // ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_SIGNING_EMPLOYEE,
              field: 'signingEmployeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'fullNameOnConcurrently',
              alsoBindTo: [
                { takeFrom: 'positionNameOnConcurrently', bindTo: 'signingPositionName'},
                {takeFrom: 'id', bindTo: 'signingEmployeeId' },
              ],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'number',
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   }
              // ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_SIGNING_POSITION_EMPLOYEE,
              field: 'signingPositionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
              // readonly: true,
              type: 'text',
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   }
              // ],
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_STATUS,
              field: 'status',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true
            }
          ]
        ]
      },
    ];
  selectedData: any;
  constructor(
    public override dialogService: DialogService,
    private personnelCenterService: PersonnelCenterService,
    private appService: AppService,
    private router : Router
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CONCURRENTLY_EDIT;
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.selectedData = this.router.getCurrentNavigation()?.extras.state!['selectedData'];
    }

    this.crud = {
      c: api.HU_CONCURRENTLY_CREATE,
      r: api.HU_CONCURRENTLY_READ,
      u: api.HU_CONCURRENTLY_UPDATE,
      d: api.HU_CONCURRENTLY_DELETE
    };

  }

  ngOnInit(): void {

    this.subscriptions.push(
      // this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TDCM').subscribe(x => {
      //   if (x.ok && x.status === 200) {
      //     const body: IFormatedResponse = x.body;
      //     if (body.statusCode === 200) {
      //       const newObjectEmployeeOptions: ICoreDropdownOption[] = [];
      //       body.innerBody.map((item: any) => {
      //         newObjectEmployeeOptions.push({
      //           value: item.id,
      //           text: item.name
      //         })
      //       });
      //       this.objectEmployeeOptions$.next(newObjectEmployeeOptions);
      //     }
      //   }
      // })
      )
      this.subscriptions.push(
        this.appService.get(api.HU_CONCURRENTLY_GET_POSITION_POLITICAL).subscribe(x =>{
          if(x.ok && x.status === 200){
            const body : IFormatedResponse = x.body;
            if(body.statusCode === 200){
              const options: {value: number, text: string}[] = [];
              body.innerBody.map((y: any) =>{
                options.push({
                  value : y.id,
                  text : y.name
                })
              })
              this.positionPoliticalOptions$.next(options)
            }
          }
        })
      )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {

    
    this.form = e;
    if(!!this.selectedData){
      this.subscriptions.push(
        this.appService.get(api.HU_CONCURRENTLY_READ + `?id=${this.selectedData[0].id}`).subscribe((x : any) => {
          if(!!x){
            this.form.patchValue(x.body.innerBody);
            this.appService.get(api.HU_ORGANIZATION_READ + `?id=${this.selectedData[0].orgId}`).subscribe((y : any) => {
              this.orgGetById$.next(y.body.innerBody)
            })
            this.appService.get(api.HU_POSITION_READ + `?id=${this.selectedData[0].positionId}`).subscribe((z : any) =>{
              this.positionGetById$.next(z.body.innerBody)
            })
            this.appService.get(api.HU_EMPLOYEE_READ + `?id=${this.selectedData[0].employeeId}`).subscribe((x : any) =>{
              this.employeeGetByIdObject$.next(x.body.innerBody)
            })
            this.form.get('id')?.setValue(0)
            this.form.get('effectiveDate')?.setValue(null)
            this.form.get('decisionNumber')?.setValue(null)
          }
        })

      )
    }
    this.subscriptions.push( // <== Outer push
      this.form.get('orgId')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.subscriptions.push( // <== Inner push
            this.appService
              .get(api.HU_POSITION_BY_ORGID + x)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    const options: { value: number | null; text: string; }[] = [];
                    res.body.innerBody.map((g: any) => {
                      options.push({
                        value: g.id,
                        text: g.name
                      })
                    })
                    this.positionOptions$.next(options);
                  }
                }

                this.form.get('positionId')?.setValue(this.form.get('positionId')?.value);

              })
          ) // Close inner push

        } else {
          //this.form.get('userName')?.disable()
          //this.form.get('fullname')?.disable()
        }
      })!
    )
    this.subscriptions.push(
      this.form.get('status')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if(!!x && x == 'Đã phê duyệt'){
          this.form.disable()
        }
      })!
    )
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.personnelCenterService.reloadFlag$.next(true);
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
