import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreDropdownOption, MultiLanguageService, AppService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";
interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-pe-employee-assessment',
  templateUrl: './pe-employee-assessment.component.html',
  styleUrl: './pe-employee-assessment.component.scss'
})

export class PeEmployeeAssessmentComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_PE_EMPLOYEE_ASSESSMENT;

  listId: number[] = [];

  listId2: number[] = [];

  instanceNumberNow: any;

  evaluationPeriodName: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_ASSESSMENT_PERIOD;

  huCompetencyPeriodId!: number;


  // drop down list "Evaluation period"
  evaluationPeriodValues: any;
  evaluationPeriodOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  evaluationPeriodGetByIdObject$ = new BehaviorSubject<any>(null);


  constructor(
    public override mls: MultiLanguageService,
    public appService: AppService
  ) {
    super(mls);

    this.huCompetencyPeriodId = -1;
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );

    this.subscriptions.push(
      this.appService.get("/api/PeEmployeeAssessment/GetDropDownListEvaluationPeriod").subscribe(res => {
        const options: OptionContext[] = [];

        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.evaluationPeriodOptions$.next(options);
      })
    );
  }

  ngAfterViewInit(): void {
    
  }

  onSelectedIdsChange(e: any) {
    this.listId = e;
  }

  onSelectedIdsChange2(e: any) {
    this.listId2 = e;
  }

  addEmployee(): void {
    var payload = {
      ids: this.listId,
      huCompetencyPeriodId: this.huCompetencyPeriodId
    };

    this.subscriptions.push(
      this.appService.post("/api/PeEmployeeAssessment/AddEmployee", payload).subscribe(x => {
        this.instanceNumberNow = new Date().getTime();

        // set this.listId = []
        // to delete all element in array
        this.listId = [];
      })
    );
  }

  deleteEmployee(): void {
    this.subscriptions.push(
      this.appService.post("/api/PeEmployeeAssessment/DeleteEmployee", this.listId2).subscribe(x => {
        this.instanceNumberNow = new Date().getTime();

        // set this.listId2 = []
        // to delete all element in array
        this.listId2 = [];
      })
    );
  }

  onDropDownListEvaluationPeriodChange($event: number): void {
    this.huCompetencyPeriodId = $event;
  }
}