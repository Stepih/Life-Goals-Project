import { NextResponse } from "next/server";
import { serialize } from 'cookie';

const deleteAuthCookies = async (res:NextResponse) => {
    res.headers.append(
    'Set-Cookie',
    serialize('token', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0), // Удалить
    })
  );

  res.headers.append(
    'Set-Cookie',
    serialize('refreshToken', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0), // Удалить
    })
  );

}

export default deleteAuthCookies