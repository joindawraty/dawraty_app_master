//API ENDPOINTS

export const BASE_API = 'https://www.admin.dawratycourses.com'; // PROD
// export const BASE_API = 'http://dawraty.dev'; // DEV
// export const BASE_API = 'http://localhost:8000'; // LOCAL

export const AUTHORIZATION_URI = '';

// auth
export const LOGIN = 'api/auth/login';
export const LOGOUT = 'api/auth/logout';
export const DELETEME = 'api/auth/deleteMe';
export const USER_PROFILE_UPDATE = 'api/auth/userProfileUpdate';
export const REGISTER_STUDENT = 'api/auth/register?type=student';
export const REGISTER_INSTRUCTOR = 'api/auth/register?type=instructor';
export const EMAIL_VERIFY = 'api/auth/emailOtpVerify';
export const OTP_VERIFY = 'api/auth/otpVerify';
export const NOTIFICATIONS = 'api/auth/notifications';
export const READ_NOTIFICATION = 'api/auth/notifications/:id';
export const FORGOT = 'api/auth/forgot';
export const FORGOT_OTP_VERIFY = 'api/auth/forgotVerfiyOtp';
export const FORGOT_NEW_PASSWORD = 'api/auth/forgotNewPassword';
export const GET_TAGS = 'api/v1/tags';
export const GET_CREDIT = '/api/auth/credit/:id';
// singles
export const GET_COURSES = 'api/v1/Courses';
export const GET_CATEGORY_COURSES = 'api/v1/categoryCourses/';
export const GET_CATEGORIES = 'api/v1/category';
export const GET_BANNERS = 'api/v1/banners';
export const GET_COURSE = 'api/v1/course/:id';
export const GET_TESTIMONIALS = 'api/v1/testimonial';
export const GET_STUDENT_COURSES = 'api/auth/studentCourse';
export const GET_STUDENT_THREADS = 'api/auth/threads';

// cart
export const GET_CART = 'api/auth/carts';
export const ADD_CART = 'api/auth/carts';
export const ADD_CART_BULK = 'api/auth/carts?get_by=bulk_course';
export const DELETE_CART = 'api/auth/carts';
export const GET_CART_COUNT = 'api/auth/cart_count';

// wishlist
export const WISHLIST = 'api/auth/wishLists';
export const DELETE_WISHLIST = 'api/auth/wishLists/:id';

// instructor
export const GET_INSTRUCTOR_DASHBOARD = 'api/v1/instructor_dashboard';
export const DOS_USER_INSTRUCTOR = 'api/auth/DosUserInstructor';
export const DOS_USER_STUDENT = 'api/auth/DosUserStudent';
export const GET_COURSE_INSTRUCTOR = 'api/v2/course_instructor';
export const GET_INSTRUCTOR_COURSES = 'api/auth/instructorCourse';

// comments
export const GET_USER_COMMENTS = 'api/auth/UserComments/:id';
export const POST_USER_COMMENT = 'api/auth/UserComment/:id';

// payments
export const GET_INCOME_HISTORY = 'api/v1/income_history';
export const GET_PAYMENTS = 'api/v1/payments';
export const GET_STUDENT_ORDERS = 'api/auth/studentOrder';
export const GET_INSTRUCTOR_SALES = 'api/v1/instructor_course_sales';

//checkout
export const ADD_ADDRESSES = 'api/auth/addresses/add';
export const GET_ADDRESSES = 'api/auth/addresses';
export const GET_COUNTRIES = 'api/v1/countries';
export const GET_CHECKOUT_PRODUCTS = 'api/auth/checkout';
export const CHECKOUT_ORDERS = 'api/auth/orders';
export const PROMO_CODE = 'api/auth/promoCode';
export const APPLE_IAP_PURCHASE = 'api/auth/apple_iap_purchase';

//flashcards
export const GET_FLASHCARDS = 'api/v1/flashcards';
