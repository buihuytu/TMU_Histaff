export class Organization {
  id?: number;
  code?: string;
  name?: string;
  parentId?: number;
  mngId?: number; // Người quản lý
  mngName?: string; // Người quản lý
  foundationDate?: Date; // Ngày thành lập
  dissolveDate?: Date; // Ngày giải thể
  phone?: string;
  fax?: string;
  address?: string;
  businessNumber?: string; // Số giấy phép kinh doanh
  businessDate?: Date; // Ngyaf cấp giấy phép kinh doanh
  taxCode?: string; // Mã số thuế
  note?: string;
  createBy?: string;
  updatedBy?: string;
  createDate?: Date;
  updatedDate?: Date;
  posName?: string;
  parentName?: string;
  avatar?: string;
}
