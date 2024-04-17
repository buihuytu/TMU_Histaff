import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService, AppService } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription, combineLatest, map } from "rxjs";
import { SalaryRankEditService } from "../../salaryrank/edit/salaryrank-edit.services";
import { SalaryLevelEditService } from "./salarylevel-edit.service";

@Component({
    selector: "app-salarylevel-edit",
    templateUrl: "./salarylevel-edit.component.html",
    styleUrls: ["./salarylevel-edit.component.scss"],
    encapsulation: ViewEncapsulation.None,
  })
  export class SalaryLevelEditComponent extends BaseEditComponent {
    /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "HU_SALARY_LEVEL";
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  rankOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  scaleGetByIdObject$ = new BehaviorSubject<any>(null);
  scaleGetByIdApi = api.HU_SALARY_SCALE_READ;
  rankGetByIdObject$ = new BehaviorSubject<any>(null);
  rankGetByIdApi = api.HU_SALARY_RANK_READ;
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
  regionOptions$ = new BehaviorSubject<any[]>([]);
  regionGetByIdApi = api.INS_REGION_READ;
  regionGetByIdObject$ = new BehaviorSubject<any>(null);
  check: any[] = [];
  region: any[] = [];


  
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden : true
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_SCALE_NAME,
              field: 'salaryScaleId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.scaleOptions$,
              getByIdObject$: this.scaleGetByIdObject$,
              getByIdApi: this.scaleGetByIdApi,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                
              ]
            }
          ],
          [
            
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_RANK,
              field: 'salaryRankId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.rankOptions$,
              getByIdObject$: this.rankGetByIdObject$,
              getByIdApi: this.rankGetByIdApi,
              type: 'number',
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
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NAME,
              field: 'regionId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'areaName',
              dropdownOptions$: this.regionOptions$,
              getByIdObject$: this.regionGetByIdObject$,
              getByIdApi: this.regionGetByIdApi,
              type: 'number',
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
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly:true
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_COEFFICIENT,
              field: 'coefficient',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_HOLDING_MONTH,
              field: 'holdingMonth',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              
            },
          ],
          
          [
            
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_TOTAL_SALARY,
              field: 'totalSalary',
              value: '',
              controlType: EnumFormBaseContolType.CURRENCY,
              
              type: 'number',
              pipe: EnumCoreTablePipeType.NUMBER,
              readonly :true,
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_LEVEL_EFFECTIVE_DATE,
              field: 'effectiveDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_LEVEL_EXPIRATION_DATE,
              field: 'expirationDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',

            },
            
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_BASIC,
              field: 'monney',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              hidden: true
            },
          ]
        ]
      },
    ];

    

  constructor(
    public override dialogService: DialogService,
    private slrLevelService: SalaryLevelEditService,
    private slrRankService : SalaryRankEditService,
    private appService: AppService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_LEVEL_EDIT;

    this.crud = {
      c: api.HU_SALARY_LEVEL_CREATE,
      r: api.HU_SALARY_LEVEL_READ,
      u: api.HU_SALARY_LEVEL_UPDATE,
      d: api.HU_SALARY_LEVEL_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
    
    this.slrRankService.getScales()
      .pipe(
        map((x: any) => {
          console.log(x)
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string; }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe(response => {
        this.scaleOptions$.next(response);
        this.loading = false;
      })

      this.subsctiptions.push(
        this.slrLevelService.getRegionByDateNow()
        .pipe(
          map((x : any) => {
            const options: {value: number; text: string; code: string; money: number}[] = [];
            x.body.innerBody.map((y: any) => {
              options.push({
                value : y.id,
                text: y.areaName,
                code: y.otherListCode,
                money: y.money
              })
            })
            return options;
          })
        )
        .subscribe((response) => {
          this.region = response;
          this.regionOptions$.next(response);
          this.loading = false;
        })
      )

      


  }
  ngAfterViewInit(): void{
    this.loading  = true;
    
    this.subsctiptions.push(
      this.form.get('regionId')?.valueChanges.subscribe(x => {
        if(!!x){
          this.check = this.region.filter(y => y.value == x)
          if(this.check.length > 0){
            this.form.get('monney')?.setValue(this.check[0].money)
          } else {
            this.appService.get(api.INS_REGION_READ + `?id=${this.form.get('regionId')?.value}`).subscribe(x => {
              if(!!x) {
                this.form.get('monney')?.setValue(x.body.innerBody.money)
                this.calculator()
              }
            })
          }
        }
      })!
    )
  }
  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.appService.get(api.HU_SALARY_LEVEL_GETCODE)
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe(response => {
          if(this.form.get('code')?.value == "") this.form.get('code')?.patchValue(response);
        })
    )!
    const salaryScaleControl = this.form.get('salaryScaleId');
    if(salaryScaleControl){
      this.subsctiptions.push(
        this.form.get('salaryScaleId')?.valueChanges.subscribe((x : any) => {
          if (!!x) {
            this.slrRankService.GetRankByScaleId(this.form.get('salaryScaleId')?.value)
            .pipe(
              map((x: any) => {
                console.log(x)
                if (x.ok && x.status === 200) {
                  const options: { value: number; text: string; }[] = [];
                  x.body.innerBody.map((g: any) => {
                    options.push({
                      value: g.id,
                      text: g.name
                    })
                  })
                  return options;
                } else {
                  return [];
                }
              })
            )
            .subscribe(response => {
              this.rankOptions$.next(response);
              this.loading = false;
              this.form.get('salaryRankId')?.enable()
            })
          } else {
            this.form.get('salaryRankId')?.disable() ;
          }
        })!
      )
      
    }
    // this.subsctiptions.push( 
    //   combineLatest(
    //     [this.form.controls['monney']?.valueChanges, 
    //     this.form.controls['coefficient']?.valueChanges]
    //   ).pipe(
    //     map(([q, p] :  [number, number]) => q * p))
    //     .subscribe(t => {
    //     this.form.get('totalSalary')?.setValue(t)
    //   })
    // )
    
    this.subsctiptions.push(
      this.form.get('coefficient')?.valueChanges.subscribe(x =>{
        this.calculator()
      })!
    )

    
  }



  private calculator(){
    if(this.form.get('monney')?.value != null){
      if(!!!this.form.get('coefficient')?.value){
        // this.form.get('coefficient')?.setValue(0)
        this.form.get('totalSalary')?.setValue(this.form.get('monney')?.value)
      }else{
        let totalSalary = this.form.get('coefficient')?.value * this.form.get('monney')?.value
        this.form.get('totalSalary')?.setValue(totalSalary)
      }
    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }
}