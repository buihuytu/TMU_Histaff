import { Component, isDevMode } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, EnumCoreButtonVNSCode, ICoreFormSection, MultiLanguageService, DialogService, AppService, AlertService, CorePageListService, EnumFormBaseContolType, IFormatedResponse, noneAutoClosedAlertOptions } from "ngx-histaff-alpha";
import { Subscription } from "rxjs";
import { ContractInforService } from "../contractinfor.service";

@Component({
  selector: 'app-liquidate-dialog',
  templateUrl: './liquidate-dialog.component.html',
  styleUrls: ['./liquidate-dialog.component.scss']
})

export class LiquidateDialogComponent extends BaseEditComponent{
  /* Properties to be passed into core-page-edit */
  override entityTable = "HU_CONTRACT";

  employeeIds!: number[];
  captionCode!: EnumTranslateKey;

  subsctiptions: Subscription[] = [];

  customFormButtonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
    EnumCoreButtonVNSCode.NONE_HEADER_LIQUIDATE_CONTRACT
  ]

  sections!: ICoreFormSection[];

  listInstance!: number;

  constructor(
      public mls: MultiLanguageService,
      public override dialogService: DialogService,
      private contractInforService: ContractInforService,
      private appService: AppService, // CoreService is DEPRECATED!!!,
      private router: Router,
      private route: ActivatedRoute,
      private alertService: AlertService,
      private corePageListService: CorePageListService
  )
  {
    super(dialogService);
    
    this.captionCode = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_LIQUIDATE_CONTRACT;
    
    this.contractInforService.currentListEmployeeSelected.subscribe(id => this.employeeIds = id);
    
    // set data for this.listInstance
    this.listInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );

    // set data for this.corePageListService
    this.corePageListService.instances[0].instanceNumber = this.listInstance;

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
    
    if(this.employeeIds.length != 0){
      if(this.form.get('id')?.value == "")
      this.form.get('id')?.patchValue(this.employeeIds[0]);
    }
  }

  ngOnInit(): void{
    this.sections =
    [
      {
        rows: [
          [
            {
              flexSize: 1,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true,
              type: 'text',
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_LIQUIDATION_DATE_FILTER,
              field: 'dateLiquidation',
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
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_LIQUIDATION_REASON,
              field: 'reasonLiquidation',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ]
        ]
      }
    ];
  }

  ngAfterViewInit(): void {

  }

  onLiquidateContract(e: any): void{
    // LAM MUA LAM GIO O DAY

    let payload = JSON.parse(e);
    this.appService.post(api.HU_CONTRACT_LIQUIDATE_CONTRACT, payload).subscribe(x => {
      if (x.ok && x.status === 200) {
        const body: IFormatedResponse = x.body;
        
        if (body.statusCode === 200) {
          const listInstances = this.corePageListService.instances.filter(
            (y) => y.instanceNumber === this.listInstance
          );

          if (!!listInstances.length) {
            listInstances[0].reloadFlag$.next(
              !!!listInstances[0].reloadFlag$.value
            );
          }

          this.router.navigate(['../'], { relativeTo: this.route, state: { id: body.innerBody.id, instanceNumber: this.listInstance } });
        }
      } else {
        this.onNotOk200Response(x);
      }
    });
  }

  onNotOk200Response(x: object): void {
    if (isDevMode()) {
      if (Object.keys(x).length === 0) {
        this.alertService.error("No response content. It was possibly a CORS error.", noneAutoClosedAlertOptions)
      } else {
        //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions)
      }
    }
  }

}