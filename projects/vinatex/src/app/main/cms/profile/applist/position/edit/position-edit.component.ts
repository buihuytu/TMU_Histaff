import {
  AfterViewInit,
  Component,
} from "@angular/core";
import { BehaviorSubject, Subscription, distinctUntilChanged, filter, map,  } from "rxjs";
import { FormGroup, Validators } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICoreChecklistOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, PositionEditService, OrganizationService, ResponseService, MultiLanguageService, IFormatedResponse } from "ngx-histaff-alpha";


@Component({
  selector: "app-position-edit",
  templateUrl: "./position-edit.component.html",
  styleUrls: ["./position-edit.component.scss"],
})
export class PositionEditComponent extends BaseEditComponent implements AfterViewInit {


  scaleOptions$: BehaviorSubject<ICoreDropdownOption[]> | undefined;
  currentListOrg!:any[];
  orgId: number;
  confirmTDV: number = 0;
  loading: boolean = false;
  override entityTable = "HU_POSITION";
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  groupPositionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsStatus$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  jobOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];

  groupPositionGetByIdObject$ = new BehaviorSubject<any>(null);
  groupPositionGetByIdApi = api.HU_GROUP_POSITION_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_POSITION_READ;

  employeeCSMGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeCSMGetByIdApi = api.HU_POSITION_READ;

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  jobGetByIdObject$ = new BehaviorSubject<any>(null);
  jobGetByIdApi = api.HU_JOB_READ;

  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden : true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ID,
              field: 'confirmChangeTdv',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden : true
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_TDV,
              field: 'isActive',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              hidden : true
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_MASTER,
              field: 'master',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              hidden : true
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_INTERIM,
              field: 'interim',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              hidden : true
            },
          ],
          // [
          //   {
          //     flexSize: 6,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_GROUP,
          //     field: 'groupId',
          //     value: '',
          //     getByIdObject$: this.groupPositionGetByIdObject$,
          //     getByIdApi: this.groupPositionGetByIdApi,
          //     controlType: EnumFormBaseContolType.DROPDOWN,
          //     dropdownOptions$: this.groupPositionOptions$,
          //     type: 'text'
          //   }
          // ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CODE,
              field: 'code', // tự sinh theo rule mã các loại phòng ban_chức danh_công ty
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ],
              readonly: true,
              hidden:true
            },    
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_JOB,
              field: 'jobid',
              value: '',
              getByIdObject$: this.jobGetByIdObject$,
              getByIdApi: this.jobGetByIdApi,
              shownFrom: 'nameVn',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.jobOptions$,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
              field: 'orgId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,

              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
              getByIdObject$: this.orgUnitGetByIdObject$,
              getByIdApi: this.orgUnitGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true,
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_EFFECTIVE_DATE,
              field: 'effectiveDate',
              value: new Date(),//  ok
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
          ],
          [
            
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_LM_JOB,
              field: 'lm',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerVerifyIgnore : true,
              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.POSITION_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              alsoBindTo: [{ takeFrom: 'masterName', bindTo: 'lmname' },],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true,
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_LM,
              field: 'lmname',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true, // We will update this field programatically
              type: 'text',
              disabled: true,
            },
          ],
          [
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_TDV,
              field: 'isTDV',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_NOT_OT,
              field: 'isNotot',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_MASTER,
              field: 'masterName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',              
              readonly: true,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_INTERIM,
              field: 'interimname',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',              
              readonly: true,
            },
            // {
            //   flexSize: 4,
            //   label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_STATUS,
            //   field: 'statusId',
            //   value: '',
            //   getByIdObject$: this.sysOtherlistGetByIdObject$,
            //   getByIdApi: this.sysOtherlistGetByIdApi,
            //   shownFrom: 'name',
            //   controlType: EnumFormBaseContolType.DROPDOWN,
            //   dropdownOptions$: this.groupOptionsStatus$,
            //   type: 'number',
            //   validators: [
            //     {
            //       name: 'required',
            //       validator: Validators.required,
            //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //     }
            //   ]
            // },          
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_JOB_DESC,
              field: 'jobDesc',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ],
          [
            
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CSM_JOB,
              field: 'csm',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerVerifyIgnore : true,
              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.POSITION_SEEK,
              getByIdObject$: this.employeeCSMGetByIdObject$,
              getByIdApi: this.employeeCSMGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              alsoBindTo: [{ takeFrom: 'masterName', bindTo: 'csmname' },],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true, 
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CSM,
              field: 'csmname',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true, // We will update this field programatically
              type: 'text',
            },
          ],
          [
            
            // {
            //   flexSize: 2,
            //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_PLAN,
            //   field: 'isplan',
            //   value: '',
            //   controlType: EnumFormBaseContolType.CHECKBOX,
            //   type: 'boolean',
            // },
            
            // {
            //   flexSize: 2,
            //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_NONPHYSICAL,
            //   field: 'isnonphysical',
            //   value: '',
            //   controlType: EnumFormBaseContolType.CHECKBOX,
            //   type: 'boolean',
            // },
            
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ]
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private positionEditService: PositionEditService, // CoreService is DEPRECATED!!!
    private organizationService: OrganizationService,
    private responseService: ResponseService,    
    private mls: MultiLanguageService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_POSITION_EDIT;

    this.crud = {
      c: api.HU_POSITION_CREATE,
      r: api.HU_POSITION_READ,
      u: api.HU_POSITION_UPDATE,
      d: api.HU_POSITION_DELETE,
    };

    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.currentListOrg = newOrgIds;
    this.orgId = this.getMin(newOrgIds);

  }
  ngOnDestroy(): void {
    this.organizationService.status$.value.activeKeys = this.currentListOrg;
    this.organizationService.status$.value.selectedKey = this.orgId.toString();
  }

  getMin(numbers: number[]): number {
    if (numbers.length === 0) {
      return 0; // Return undefined if the array is empty.
    }

    let min = numbers[0]; // Assume the first element is the minimum.

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i]; // Update the minimum if a smaller value is found.
      }
    }

    return min;
  }
  ngAfterViewInit(): void {

    setTimeout(() => {
      this.loading = true;

      if (this.form.get('id')?.value == '')
      {
        this.subscriptions.push(
          this.positionEditService.getCode()
            .pipe(
              map((f: any) => {
                let code = "";
                code = f.body.innerBody.code;
                return code;
              })
            )
            .subscribe(response => {
              this.form.get('code')?.patchValue(response);
              this.formInitStringValue = JSON.stringify(this.form.getRawValue());
              this.loading = false;
            })
        );
      }
      if (this.form.get('orgId')?.value == '')
      {
        this.form.get('orgId')?.patchValue(this.orgId);
        this.formInitStringValue = JSON.stringify(this.form.getRawValue());

        this.subscriptions.push( // <== Inner push
            this.appService.get(this.orgUnitGetByIdApi + "?id=" + this.orgId).subscribe(o => {
              if (o.ok && o.status === 200) {
                const body: IFormatedResponse = o.body
                if (body.statusCode === 200 && !!body.innerBody) {
                  this.orgUnitGetByIdObject$.next(body.innerBody)
                } else {
                  //this.responseService.resolve(body);
                }
              }
            })
          )
      }
      this.subscriptions.push(
        this.appService
        .get(api.HU_GROUP_POSITION_READ_ALL)
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
          this.groupPositionOptions$.next(options);
        }}
        })
      )
      this.subscriptions.push(
        this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'STATUS')
        .subscribe((res: any) => {
  
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.groupOptionsStatus$.next(options);
      
            }
          }
        })
      )
      this.subscriptions.push(
        this.appService
        .get(api.HU_JOB_GETLIST)
        .subscribe((res: any) => {
  
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.jobOptions$.next(options);
      
            }
          }
        })
      )
    },1000)
    
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.formInitStringValue = JSON.stringify(this.form.getRawValue());      
    this.form.get('isTDV')?.valueChanges.pipe(distinctUntilChanged())
      .pipe(
        filter(_ => {
          const touched = this.form.get('isTDV')?.touched;
          return !!touched
        })
      ).subscribe(x => {
        if (!!x){
          const id = this.form.get('id')?.value;
          const orgId = this.form.get('orgId')?.value;
          this.appService
          .post(api.HU_POSITION_CHECKTDV, { id:id,isTdv:x,orgId:orgId})
          .subscribe((res: any) => {            
            if (!!res.ok && res.status === 200 && this.confirmTDV == 0) {
              this.confirmTDV = 1;
              const body: IFormatedResponse = res.body
              if (body.statusCode == 200 &&  !!body.innerBody) {   
                const confirm = window.confirm(
                  this.mls.trans(EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME) + body.innerBody + this.mls.trans(EnumTranslateKey.UI_ENTITY_CONFIRM_CAPTION_POSITION_CHANGE_ALL_TDV) +' ?'
                );
                if (confirm) {
                  this.form.get('confirmChangeTdv')?.setValue(true);
                }else{
                  this.form.get('confirmChangeTdv')?.setValue(false);
                }
              }
            }
          })        
       }else{
        this.confirmTDV = 0;
        this.form.get('confirmChangeTdv')?.setValue(null);
       }
      })
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
