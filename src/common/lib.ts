import { HttpException, HttpStatus } from '@nestjs/common';
import * as Excel from 'exceljs';

export async function getMessage(messageCode: any) {
  try {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('src/assets/message.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    let message;
    for (let i = 1; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      if (row.getCell(1).value == messageCode) {
        message = row.getCell(2).value;
        break;
      }
    }
    if (!message) {
      throw new HttpException(
        {
          messageCode: 'MESSAGE_NOTFOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return message;
    }
  } catch (err) {
    if (err.response.messageCode) {
      const message = await getMessage(err.response.messageCode);
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const message = await getMessage('INTERNAL_SERVER_ERROR');
      throw new HttpException(
        {
          message: message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export function isNumberic(phone: any) {
  const regex = /^[0-9]+$/;
  return regex.test(phone);
}

export function isValidDate(value: any) {
  const date = new Date(value);
  return date.toString() !== 'Invalid Date';
}

export function deg2rad(num: number) {
  return num * (Math.PI / 180);
}

export function isPositiveNum(num: number) {
  return num > 0;
}

export function isBit(num: number) {
  if (num != 0 && num != 1) {
    return false;
  } else {
    return true;
  }
}

export function calDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Number((R * c).toFixed(2));
  return distance;
}

export function isLatitude(lat: any) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

export function isLongitude(lng: any) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}

export function isDateGreaterThanNow(dateString: any) {
  const dateToCheck = new Date(dateString);
  const now = new Date();
  now.setHours(now.getHours() + 7);
  return dateToCheck > now;
}

export function isLessThan15Years(date1: any, date2: any) {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears < 15;
}
