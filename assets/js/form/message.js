const messageVietnamese = {
    // Input Validation
    ER001: (param) => `${param} required.`,
    ER002A: (param, length, current) => `${param} maximum ${length} characters. (current ${current} character.)`,
    ER002B: (param, length, current) => `${param} minimum ${length} characters. (current ${current} character.)`,
    ER003: `Invalid Email.`,
    ER004: `No icon characters, no two byte characters.`,
    ER005: `No space.`,
    ER006: `Confirm password does not match.`,
    ER007: (param) => `${param} is existed.`,
    ER008: `No capital characters.`,
    ER009: (param) => `Format file accept ${param}`,
    ER0010: (param) => `Upload file is only ${param}`,
    ER0011: `Required file.`,
    ER0012: `No special characters.`,
    ER0013: (param) => `Required link ${param}`,
    ER0014: `Required valid date, month, year.`,
  
    // Auth
    RES001: `Thông tin đăng nhập không đúng.`,
    RES002A: `Cập nhật thất bại.`,
    RES002B: `Cập nhật thành công.`,
    RES003A: `Xóa thất bại.`,
    RES003B: `Xóa thành công.`,
    RES004A: `Tạo mới thất bại.`,
    RES004B: `Tạo mới thành công.`,
    RES005: `Tài khoản không thể truy cập.`
};