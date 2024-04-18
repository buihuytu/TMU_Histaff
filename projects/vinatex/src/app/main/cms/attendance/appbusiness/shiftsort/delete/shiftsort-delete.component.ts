import { Component, isDevMode } from "@angular/core";
import { ShiftSortComponent } from "../shiftsort.component";
import { AlertService, AppService, BaseEditComponent, DialogService, EnumCoreButtonVNSCode, EnumFormBaseContolType, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, IFormatedResponse, MultiLanguageService, ResponseService, UrlService,} from "ngx-histaff-alpha";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { ShiftSortService } from "../shiftsort.service";
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
    selector: "app-shiftsort-delete",
    templateUrl: "./shiftsort-delete.component.html",
    styleUrls: ["./shiftsort-delete.component.scss"]
})
export class ShiftSortDeleteComponent extends BaseEditComponent{
    /* Properties to be passed into core-page-edit */
    override entityTable = "AT_WORKSIGN";

    loading: boolean = false;
    employeeIds!: number[];    
    startDate!: any;
    endDate!: any;
    minDate!: Date;
    maxDate!: Date;

    forceReloadingFlag$ = new BehaviorSubject<boolean>(false);
    captionCode!: EnumTranslateKey;
    formComposition!: ICorePageEditColumnComposition[][];
    subsctiptions: Subscription[] = [];
    crud!: ICorePageEditCRUD;

    customFormButtonItems: EnumCoreButtonVNSCode[] = [
      EnumCoreButtonVNSCode.NONE_HEADER_DELETE,
      EnumCoreButtonVNSCode.NONE_HEADER_CANCEL
    ]

    sections!: ICoreFormSection[];

    constructor(
        public mls: MultiLanguageService,
        public override dialogService: DialogService,
        private shiftSortService: ShiftSortService,
        private appService: AppService, // CoreService is DEPRECATED!!!,
        private router: Router,
        private route: ActivatedRoute,
        private urlService: UrlService,
        private responseService: ResponseService,
        private alertService: AlertService,
        private shiftSortComponent: ShiftSortComponent
    ){
        super(dialogService);
        this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SHIFT_SORT_DELETE;
        this.shiftSortService.currentListEmployeeSelected.subscribe(id => this.employeeIds = id);
        this.shiftSortService.currentMinDate.subscribe(date => this.minDate = new Date(new Date(date).setHours(0,0,0)));

        this.shiftSortService.currentMaxDate.subscribe(date => this.maxDate = new Date(new Date(date).setHours(23,59,59,999)));
        console.log(this.employeeIds);
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
      this.loading = true;
      this.sections =
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
                readonly: true,
                hidden: true,
                type: 'text'
              },
            ],
            [
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_DATE_START,
                field: 'dateStart',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                readonly: false,
                type: 'text',
                rangeLimit: {
                  minDate: this.minDate,
                  maxDate: this.maxDate
                },
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
                  label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_DATE_END,
                  field: 'dateEnd',
                  value: '',
                  controlType: EnumFormBaseContolType.DATEPICKER,
                  readonly: false,
                  type: 'text',
                  rangeLimit: {
                    minDate: this.minDate,
                    maxDate: this.maxDate
                  },
                  validators: [
                    {
                      name: 'required',
                      validator: Validators.required,
                      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                    }
                  ]
                },
            ],
          ]
        }
      ];
    }

    ngAfterViewInit(): void {
      console.log("min: " + this.minDate);
      console.log("max: " + this.maxDate);
    }

    onDelete(e: FormGroup): void{
      this.startDate = this.form?.get('dateStart')?.value;
      this.endDate = this.form?.get('dateEnd')?.value;
      console.log(this.startDate);
      const confirm = window.confirm(
        this.mls.trans('common.confirm.delete.prefix') + '?',
      );
      if(confirm){
        if(!!this.startDate && !!this.endDate){
          this.loading = true;
          this.subsctiptions.push(
            this.appService.post(api.AT_SHIFT_SORT_DELETE, { startDate: this.startDate, endDate: this.endDate, employeeIds: this.employeeIds }).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body
                if (body.statusCode === 200) {

                  this.forceReloadingFlag$.next(!!!this.forceReloadingFlag$.value);
                  this.form.clearAsyncValidators()
                  this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
                  // this.alertService.info(
                  //   this.mls.trans('DELETE_SUCCESS'),
                  //   alertOptions,
                  // );
                  this.shiftSortComponent.loadGrid()
                } else {
                  //this.responseService.resolve(body)
                }
              } else {
                //this.alertService.error(JSON.stringify(x), alertOptions)
              }
              this.loading = false;
            })
            )
        }
      }
    }
}