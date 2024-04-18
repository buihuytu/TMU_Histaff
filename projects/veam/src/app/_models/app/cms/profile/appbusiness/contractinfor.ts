export class ContractInfor {
  id?: number;
  employeeCode?: string; //mã nhân viên
  employeeId?: number; //Id Nhân viên
  employeeName?: string;
  positionId?: number; //chức danh
  positionName?: any;
  orgId?: number;
  orgName?: string;
  orgParentName?: string;
  contractTypeId?: number; //Loại hợp đồng
  contractNo?: string;
  startDate?: Date;
  expireDate?: Date;

  signId?: number; //Người ký
  signerName?: string; //Tên người ký
  signerPosition?: string;
  signDate?: Date; //Ngày ký
  note?: string;
  statusId?: number;

  workingId?: number; //Quyết định
  workingNo?: string; //Quyết định

  salBasic?: any;
  salPercent?: any;
}
export class SalaryInfo {
  salaryType?: string;
  salaryScale?: string;
  salaryRank?: string;

  salaryLevel?: string;
  salBasic?: string;
  salPercent?: string;
  salTotal?: string;
  salaryRankName?: string;
  salaryScaleName?: string;
  salaryLevelName?: string;
  salaryTypeName?: string;
  workingNo?: string;
}
