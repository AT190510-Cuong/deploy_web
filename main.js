var uu_tien = 0;

var ketqua = document.getElementById("ketqua");

// var str_ketqua_old = ketqua.value;

var end = false;

var str_ketqua = "";

var phim_moi = "";
var mang_so_max_index = 0;
var mang_so = new Array();

var mang_pt_max_index = 0;
var mang_pt = new Array();

var doi_dau = false;

var doi_phep_tinh = false;

var phep_tinh_cu = "";
//bấm số
function info() {
  alert(
    "Xin chào tôi tên là NGUYỄN HÙNG CƯỜNG sinh viên trường Học viện kỹ thuật mật mã"
  );
}

function ClickButton(obj) {
  if (end) {
    ketqua.value = "";
    end = false;
  }
  if (str_ketqua == "" && phim_moi == "") {
    str_ketqua = ketqua.value;
  }

  if (str_ketqua == "0") {
    str_ketqua = "";
  }
  var type = obj.innerHTML;

  if (
    type == "0" ||
    type == "1" ||
    type == "2" ||
    type == "3" ||
    type == "4" ||
    type == "5" ||
    type == "6" ||
    type == "7" ||
    type == "8" ||
    type == "9" ||
    type == "+/-" ||
    type == "."
  ) {
    doi_phep_tinh = false;

    if (type == "+/-") {
      if (doi_dau) {
        doi_dau = false;
        phim_moi = phim_moi.substring(1);
      } else {
        doi_dau = true;
        phim_moi = "-" + phim_moi;
      }
    } else {
      phim_moi += type;
    }

    ketqua.value = str_ketqua + phim_moi;
  } else if (type == "+" || type == "-" || type == "x" || type == "/") {
    if (doi_phep_tinh) {
      if (
        (phep_tinh_cu == "x" || phep_tinh_cu == "/") &&
        (type == "+" || type == "-")
      ) {
        uu_tien--;
      } else if (
        (phep_tinh_cu == "+" || phep_tinh_cu == "-") &&
        (type == "x" || type == "/")
      ) {
        uu_tien++;
      }
      mang_pt[mang_pt_max_index - 1] = type;
      ketqua.value = ketqua.value.substring(0, ketqua.value.length - 1) + type;
    } else {
      phep_tinh_cu = type;

      mang_so[mang_so_max_index] = parseFloat(phim_moi);
      mang_so_max_index++;

      mang_pt[mang_pt_max_index] = type;
      mang_pt_max_index++;

      // xử lí hiển thị
      ketqua.value = ketqua.value + type;

      if (type == "x" || type == "/") {
        uu_tien++;
      }
    }
    doi_phep_tinh = true;
    str_ketqua = "";
    phim_moi = "";
  } else if (type == "=" || type == "%") {
    end = true;
    if (phim_moi != "") {
      mang_so[mang_so_max_index] = parseFloat(phim_moi);
    }
    if (type == "=") {
      GetValue();
    } else {
      GetPercent();
    }
  } else if (type == "CE") {
    phim_moi = "";
    ketqua.value = str_ketqua + phim_moi;
  } else {
    if (phim_moi.length > 1) {
      phim_moi = phim_moi.substring(0, phim_moi.length - 1);
    } else {
      phim_moi = "";
    }
    ketqua.value = str_ketqua + phim_moi;
  }
  console.log(mang_so);
  console.log(mang_pt);
}

function GetPercent() {
  // mang_so_max_index--;
  mang_pt_max_index--;
  if (mang_so_max_index != 1 || mang_so[1] == 0) {
    ketqua.value = "0";
  } else if (mang_pt_max_index != 0) {
    ketqua.value = "0";
  } else if (mang_pt[0] != "/") {
    ketqua.value = "0";
  } else {
    var _kg = (mang_so[0] / mang_so[1]) * 100;
    ketqua.value = _kg;
  }

  str_ketqua = "";
  phim_moi = "";
  mang_so = new Array();
  mang_pt = new Array();
  mang_pt_max_index = 0;
  mang_so_max_index = 0;
  uu_tien = "0";
}

function GetValue() {
  // mang_so_max_index--;
  mang_pt_max_index--;

  while (uu_tien > 0) {
    for (var index = 0; index <= mang_pt_max_index; index++) {
      if (mang_pt[index] == "x" || mang_pt[index] == "/") {
        var sh1 = mang_so[index];
        var sh2 = mang_so[index + 1];
        var kqt = 0;
        if (mang_pt[index] == "x") {
          kqt = sh1 * sh2;
        } else if (sh2 == 0) {
          ketqua.value = "0";
        } else {
          kqt = sh1 / sh2;
        }
        mang_so[index] = kqt;

        for (
          var new_index = index + 1;
          new_index < mang_so_max_index;
          new_index++
        ) {
          mang_so[new_index] = mang_so[new_index + 1];
        }

        mang_so_max_index--;

        for (
          var new_index = index;
          new_index < mang_pt_max_index;
          new_index++
        ) {
          mang_pt[new_index] = mang_pt[new_index + 1];
        }

        mang_pt_max_index--;

        uu_tien--;

        break;
      }
    }
  }

  while (mang_so_max_index > 0) {
    var sh1 = mang_so[0];
    var sh2 = mang_so[1];

    if (mang_pt[0] == "+") {
      kqt = sh1 + sh2;
    } else {
      kqt = sh1 - sh2;
    }

    mang_so[0] = kqt;

    for (var new_index = 1; new_index < mang_so_max_index; new_index++) {
      mang_so[new_index] = mang_so[new_index + 1];
    }

    mang_so_max_index--;

    for (var new_index = 0; new_index < mang_pt_max_index; new_index++) {
      mang_pt[new_index] = mang_pt[new_index + 1];
    }

    mang_pt_max_index--;
  }
  ketqua.value = mang_so[0];
  str_ketqua = "";
  phim_moi = "";
  mang_so = new Array();
  mang_pt = new Array();
  mang_pt_max_index = 0;
  mang_so_max_index = 0;
  uu_tien = 0;
}
