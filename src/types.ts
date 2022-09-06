const TYPES = {
  ListCoursesInterface: Symbol.for(`ListCoursesInterface`),
  CreateCourseInterface: Symbol.for(`CreateCourseInterface`),
  SearchCourseInterface: Symbol.for(`SearchCourseInterface`),
  UpdateCourseInterface: Symbol.for(`UpdateCourseInterface`),
  DeleteCourseInterface: Symbol.for(`DeleteCourseInterface`),

  AuthLoginInterface: Symbol.for(`AuthLoginInterface`),


  CourseRepositoryInterface: Symbol.for(`CourseRepositoryInterface`),
  UsersRepositoryInterface: Symbol.for(`UsersRepositoryInterface`),

  CustomMiddleware: Symbol.for(`CustomMiddleware`),
};

export default TYPES;
