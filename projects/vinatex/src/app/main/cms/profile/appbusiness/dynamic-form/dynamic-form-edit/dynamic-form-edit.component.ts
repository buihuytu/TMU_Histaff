// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { EnumTranslateKey, api } from 'alpha-global-constants';
// import { AppService, BaseComponent, BaseEditComponent, CorePageEditComponent, CorePageHeaderComponent, DialogService, EnumFormBaseContolType, ICoreFormSection, IFormatedResponse, MultiLanguageService } from 'ngx-histaff-alpha';

// @Component({
//   selector: 'app-dynamic-form-edit',
//   standalone: true,
//   imports: [FormsModule,ReactiveFormsModule,CommonModule,CorePageHeaderComponent,CorePageEditComponent],
//   templateUrl: './dynamic-form-edit.component.html',
//   styleUrl: './dynamic-form-edit.component.scss'
// })


// export class DynamicFormEditComponent extends BaseEditComponent {

//   override entityTable: string = "ABC"; 
// /*
//   sections1: ICoreFormSection[] =     [
//     {
//       rows: [
//         [
//           {
//             flexSize: 0,
//             label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
//             field: 'id',
//             value: '',
//             controlType: EnumFormBaseContolType.TEXTBOX,
//             readonly: true,
//             hidden: true,
//             type: 'text'
//           },
//         ],
//         [
//           {
//             // đây là trường họ tên nhân viên

//             flexSize: 4,
//             label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_NAME,
//             field: 'fullName',
//             value: '',
//             controlType: EnumFormBaseContolType.TEXTBOX,
//             type: 'text',
//             disabled: true,
//             hidden: false
//           },
//           {
//             // đây là trường năm đánh giá

//             flexSize: 4,
//             label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_YEAR,
//             field: 'yearEvaluation',
//             value: '',
//             controlType: EnumFormBaseContolType.TEXTBOX,
//             readonly: false,
//             type: 'number',
//             hidden: false
//           }
//         ],
//       ]
//     }

//   ];

//   sections2: ICoreFormSection[] =     [
//     {
//       rows: [
//         [
//           {
//             flexSize: 4,
//             label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_YEAR,
//             field: 'yearEvaluation',
//             value: '',
//             controlType: EnumFormBaseContolType.TEXTBOX,
//             readonly: false,
//             hidden: false,
//             type: 'number',
//           }
//         ],
//       ]
//     }

//   ];
// */


//   sections: ICoreFormSection[] = [];
//   viewName!: string
//   dynamicForm!: FormGroup;
//   dynamicArray!: FormArray;
//   typeId: any;
//   data: any;
//   captionCode = EnumTranslateKey.SELECT_DYNAMIC_FORM_EDIT;
//   crud = {
//     c: api.HU_EVALUATION_COM_CREATE,
//     r: api.HU_EVALUATION_COM_READ,
//     u: api.HU_EVALUATION_COM_UPDATE,
//     d: api.HU_EVALUATION_COM_DELETE_IDS,
//   };
//   constructor(
//     public override dialogService: DialogService,
//     private fb: FormBuilder,
//     private router:Router,
//     private appService : AppService
//     ) {
//       super(dialogService);
//       if (this.router.getCurrentNavigation()?.extras?.state) {
//         this.typeId = this.router.getCurrentNavigation()?.extras?.state!['typeId']
//         switch(this.typeId){
//           case(1):
//           this.viewName = "API.Entities.HUV_DYNAMIC_FORM_EMPLOYEE";
//           break;
//           default:
//           break;
//         }

//         this.appService.get(api.GET_COLUMN_BY_TYPE_ID + this.typeId).subscribe(k => {
//           if(!!k && !!k.body.innerBody){
//             this.data = k.body.innerBody
//           } else {
//             const request = {
//               viewName : this.viewName
//             }
//             this.appService.post(api.GET_COLUMN_LIST,request).subscribe((z : any) => {
//               if (z.ok && z.status === 200) {
//                 const body: IFormatedResponse = z.body
//                 if (body.statusCode === 200) {
//                   this.data = body.innerBody
//                   const newSections: ICoreFormSection[] = [
//                     {
//                       rows: [
//                         [
//                           {
//                             field: "id",
//                             controlType: EnumFormBaseContolType.TEXTBOX,
//                             type: "number",
//                             value: 0,
//                             flexSize: 0,
//                             label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
//                             // hidden: true,
//                           }
//                         ]
//                       ]
//                     }
//                   ]
//                   this.data.map(x => {
//                     newSections[0].rows.push(
//                       [
//                         {
//                           controlType: EnumFormBaseContolType.TEXTBOX,
//                           flexSize: 12,
//                           field: x.code,
//                           label: x.code,
//                           value: "",
//                           type: "string"
//                         }
//                       ]
//                     )
//                   })
//                   this.sections = newSections;
//                 }
//               }
//             })
//           }
          
//         })
//       }
//   }

//   flag: boolean = true;

//   createForm(datas: any[]) {
//     const formControls = datas.map(item =>
//       this.fb.group({
//         code: [item.code],
//         name: [item.name]
//       })
//     );
//     this.dynamicArray = this.fb.array(formControls)
//     debugger
//     this.dynamicForm = this.fb.group({
//       dynamicArray: this.dynamicArray
//     });
//   }

//   onFormCreated(e: FormGroup): void {
//     this.form = e;
//   }
//   onFormReinit(e : FormGroup){
//     this.form = e;
//   }
// }
