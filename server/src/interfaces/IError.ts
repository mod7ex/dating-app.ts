export default interface IError extends Error {
      status_code: number;
      render?: boolean;
}
