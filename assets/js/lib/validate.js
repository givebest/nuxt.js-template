/**
 * Created by jiachenpan on 16/11/18.
 */
import validator from 'validator'

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

// 手机号码
export function validatePhone(phone) {
  const re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
  return re.test(phone)
}

// 数字输入
export function validateNumeric(rule, value, callback) {
  value = (value == 0 || value) && (value + '') || ''

  if (!validator.isNumeric(value)) {
    callback(Error('请输入数字'))
  }

  if (value < 0) {
    callback(Error('不能输入负数哦'))
  } else {
    callback()
  }
}
export function validateNumeric0(rule, value, callback) {
  value = (value == 0 || value) && (value + '') || ''
  if (!validator.isNumeric(value)) {
    callback(Error('请输入数字'))
  } else {
    callback()
  }
}

// 房间名称 / 字符串输入
export function validateRoomname(rule, value, callback) {
  value = (value == 0 || value) && (value + '') || ''
  if (value.length <= 0) {
    callback(Error('请输入内容'))
  }

  if (!validator.isLength(value, {
      min: 2,
      max: 20
    })) {
    callback(Error('请输入2-20个字符'))
  } else {
    callback()
  }
}

// 手机号码
export function validateMobilePhone(rule, value, callback) {
  value = value && (value + '') || ''

  if (value.length <= 0) {
    callback(Error('请输入手机号码'))
  }

  if (!validator.isMobilePhone(value, ['zh-CN'])) {
    callback(Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

// 身份证
export function validateID(rule, num, callback) {
  num = num + ''
  num = num.toUpperCase()
  if (!(/(^\d{17}([0-9]|X)$)/.test(num))) {
    callback(Error('请输入有效的身份证号'))
  }

  const len = num.length
  if (len === 18) {
    const re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    const arrSplit = num.match(re);

    //检查生日日期是否正确
    const dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4])
    const bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]))

    if (!bGoodDay) {
      callback(Error('请检查输入身份证出生日期'))
    } else {
      //检验18位身份证的校验码是否正确。
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      let valnum;
      let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      let nTemp = 0,
        i;
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[nTemp % 11];

      if (valnum != num.substr(17, 1)) {
        callback(Error('请输入有效的身份证号'))
      } else {
        callback()
      }
    }
  }
}

// 日期（yyyy-MM-dd）
export function validateDate(rule, value, callback) {
  value = value && (value + '') || ''
  if (!validator.isISO8601(value)) {
    callback(Error('请选择日期'))
  } else {
    callback()
  }
}

// 密码
export function validatePassword(rule, value, callback) {
  value = value && (value + '') || ''

  if (!validator.isLength(value, { min: 6 })) {
    callback(Error('密码不能小于 6 位'))
  } else {
    callback()
  }
}

// 手机验证码
export function validatePhoneCode(rule, value, callback) {
  value = value && (value + '') || ''

  if (!validator.isNumeric(value)) {
    callback(Error('请输入验证码'))
  }

  if (!validator.isLength(value, {min: 6, max: 6})) {
    callback(Error('验证码为6位'))
  } else {
    callback()
  }
}

// 不为空
export function validateNull(rule, value, callback) {
  value = value && (value + '') || ''

  if (value.length <= 0) {
    callback(Error('内容不能为空'))
  } else {
    callback()
  }
}
