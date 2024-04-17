export class Decision {
  id?: number | null;
  employeeId?: number | null; //mã nhân viên
  employeeName?: string | null; //mã nhân viên
  employeeCode?: string | null;
  orgId?: number | null;
  orgName?: string | null;
  orgParentName?: string | null;
  groupPositionId?: number | null; //chức danh
  groupPositionName?: string | null; //chức danh
  positionId?: number | null; //chức danh
  positionName?: string | null; //chức danh
  objectId?: number | null; //Đối tưởng
  typeId?: number | null; //Loại quyết định
  decisionNo?: string | null; //Sô quyết định
  effectDate?: Date | null; //Ngày hiệu lực
  salaryTypeId?: number | null; //bảng lưởng
  //salaryUp?: number; //nâng lương
  salaryScaleId?: number | null;
  salaryRankId?: number | null;
  salaryLevelId?: number | null;
  coefficient?: number | null; //Lương cơ bản
  salBasic?: number | null; //Lương cơ bản
  salPercent?: number | null; // hưởng lương
  salTotal?: number | null; //Tổng lương
  statusId?: number | null;
  signId?: number | null; //Người ký
  signerName?: string | null; //Chức danh ký
  signerPosition?: string | null; //Chức danh ký
  signDate?: Date | null; //Ngày ký
  note?: string | null;
}
