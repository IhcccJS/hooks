

export interface TServices {
  [name: string]: (params) => Promise<unknown>
}


export interface TOpts {
  initialData?: { [key: string]: any };
  defaultParams?: { [key: string]: any };
  format?: { [key: string]: (response) => any };
  onSuccess?: { [key: string]: (response) => any };
}

