import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { FormGroup } from '@angular/forms';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { ListSalariesEditService } from './list-salaries-edit.service';


@Component({
  selector: 'app-list-salaries-edit',
  templateUrl: './list-salaries-edit.component.html',
  styleUrls: ['./list-salaries-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListSalariesEditComponent
  extends BaseEditComponent
  implements AfterViewInit
{
  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = 'PA_LISTSALARIES';

  //doi tuong/nhom cong thuc luong
  objSalaryOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  obbSalaryGetByIdObject$ = new BehaviorSubject<any>(null);
  objSalaryGetByIdApi = api.HU_SALARY_TYPE_READ;
  //objSalaryGetByIdApi = api.PA_LISTSALARIES_READ_OBJ_SAL;

  //loai du lieu
  sysOtherDataTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  sysOtherDataTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherDataTypeGetByApi = api.SYS_OTHERLIST_READ;
  //sysOtherDataTypeGetByApi = api.PA_LISTSALARIES_GET_DATA_TYPE;

  //ma danh muc luong
  listSalOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  listSalGetByIdObject$ = new BehaviorSubject<any>(null);
  listSalGetApi = api.PA_LISTSAL_READ;
  //listSalGetApi = api.PA_LISTSALARIES_READ_LIST_SAL_CODE;

  //nhom ky hieu
  listGroupTypeSalOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  listGroupTypeSalGetByIdObject$ = new BehaviorSubject<any>(null);
  listGroupTypeSalGetByIdApi = api.SYS_OTHERLIST_READ;
  //listGroupTypeSalGetByIdApi = api.PA_LISTSALARIES_GET_GROUP_TYPE;

  subscriptions: Subscription[] = [];

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_OBJSAL_NAME1, //doi tuong luong/nhom cong thuc
            field: 'objSalId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.objSalaryOptions$,
            getByIdObject$: this.obbSalaryGetByIdObject$,
            getByIdApi: this.objSalaryGetByIdApi,
            type: 'number',
            readonly: true,
            shownFrom: 'name',
          },
          {
            flexSize: 6,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_GROUP_TYPE_NAME_SAL, //nhom ky hieu luong
            field: 'groupType',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.listGroupTypeSalOptions$,
            getByIdObject$: this.listGroupTypeSalGetByIdObject$,
            getByIdApi: this.listGroupTypeSalGetByIdApi,
            type: 'number',
            readonly: true,
            shownFrom: 'name',
          },
        ],
        [
          {
            flexSize: 6,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_DATA_TYPE, //kieu du lieu
            field: 'dataType',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.sysOtherDataTypeOptions$,
            getByIdObject$: this.sysOtherDataTypeGetByIdObject$,
            getByIdApi: this.sysOtherDataTypeGetByApi,
            type: 'number',
            readonly: true,
            shownFrom: 'name',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_CODE, //ma danh muc luong
            field: 'codeSal',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.listSalOptions$,
            getByIdObject$: this.listSalGetByIdObject$,
            getByIdApi: this.listSalGetApi,
            type: 'number',
            readonly: true,
            shownFrom: 'codeListsal',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            readonly: false,
          },
          {
            flexSize: 6,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_COL_INDEX,
            field: 'colIndex',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            readonly: false,
          },
        ],
        [
          {
            flexSize: 6,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_EFFECTIVE_DATE,
            field: 'effectiveDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            readonly: false,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            readonly: false,
          },
        ],
        [
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_VISIBLE,
            field: 'isVisible',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
            //readonly: true,
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_IMPORT,
            field: 'isImport',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
            //readonly: true,
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_FORMULA,
            field: 'isFormula',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
            //readonly: true,
          },
        ],
        [
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_SUM_FORMULA,
            field: 'isSumFormula',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
            readonly: true,
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_PAYBACK,
            field: 'isPayback',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
            readonly: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_QL,
            field: 'isQlTypeTn',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
            readonly: true,
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    public appService: AppService,
    private slrService: ListSalariesEditService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES;

    this.crud = {
      c: api.PA_LISTSALARIES_CREATE,
      r: api.PA_LISTSALARIES_READ,
      u: api.PA_LISTSALARIES_UPDATE,
      d: api.PA_LISTSALARIES_DELETE_IDS,
    };
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;

      this.slrService
          .getDataType()
          .pipe(
            map((x: any) => {
              if (x.ok && x.status === 200) {
                const options: { value: number; text: string }[] = [];
                x.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name,
                  });
                });
                return options;
              } else {
                return [];
              }
            })
          )
          .subscribe((response) => {
            this.sysOtherDataTypeOptions$.next(response);
            this.loading = false;
          });

      this.slrService
        .getObjSal()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.objSalaryOptions$.next(response);
          this.loading = false;
        });

        

      this.slrService
        .getGroupType()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.listGroupTypeSalOptions$.next(response);
          this.loading = false;
        });
    });
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subscriptions.push(
      this.form
        .get('groupType')
        ?.valueChanges!.pipe(distinctUntilChanged())
        .subscribe((numb: any) => {
          if (!!numb) {
            this.slrService
              .getListSal(numb)
              .pipe(
                map((x: any) => {
                  if (x.ok && x.status == 200) {
                    const options: { value: number; text: string }[] = [];
                    x.body.innerBody.map((get: any) => {
                      options.push({
                        value: get.id,
                        text: get.name,
                      });
                    });
                    return options;
                  } else {
                    return [];
                  }
                })
              )
              .subscribe((response) => {
                console.log(response);

                this.listSalOptions$.next(response);
                this.loading = false;
                this.form.get('groupType')?.enable();
              });
          } else {
            this.form.get('groupType')?.disable();
          }
        })!
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
  }


}
