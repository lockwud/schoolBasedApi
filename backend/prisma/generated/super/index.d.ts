
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model superAdmin
 * 
 */
export type superAdmin = $Result.DefaultSelection<Prisma.$superAdminPayload>
/**
 * Model school
 * 
 */
export type school = $Result.DefaultSelection<Prisma.$schoolPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const status: {
  active: 'active',
  inactive: 'inactive',
  suspended: 'suspended'
};

export type status = (typeof status)[keyof typeof status]


export const role: {
  super: 'super'
};

export type role = (typeof role)[keyof typeof role]


export const schooltype: {
  private: 'private',
  government: 'government'
};

export type schooltype = (typeof schooltype)[keyof typeof schooltype]


export const paymentStatus: {
  demo: 'demo',
  paid: 'paid',
  unpaid: 'unpaid'
};

export type paymentStatus = (typeof paymentStatus)[keyof typeof paymentStatus]

}

export type status = $Enums.status

export const status: typeof $Enums.status

export type role = $Enums.role

export const role: typeof $Enums.role

export type schooltype = $Enums.schooltype

export const schooltype: typeof $Enums.schooltype

export type paymentStatus = $Enums.paymentStatus

export const paymentStatus: typeof $Enums.paymentStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SuperAdmins
 * const superAdmins = await prisma.superAdmin.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more SuperAdmins
   * const superAdmins = await prisma.superAdmin.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.superAdmin`: Exposes CRUD operations for the **superAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SuperAdmins
    * const superAdmins = await prisma.superAdmin.findMany()
    * ```
    */
  get superAdmin(): Prisma.superAdminDelegate<ExtArgs>;

  /**
   * `prisma.school`: Exposes CRUD operations for the **school** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schools
    * const schools = await prisma.school.findMany()
    * ```
    */
  get school(): Prisma.schoolDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    superAdmin: 'superAdmin',
    school: 'school'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "superAdmin" | "school"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      superAdmin: {
        payload: Prisma.$superAdminPayload<ExtArgs>
        fields: Prisma.superAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.superAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.superAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload>
          }
          findFirst: {
            args: Prisma.superAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.superAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload>
          }
          findMany: {
            args: Prisma.superAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload>[]
          }
          create: {
            args: Prisma.superAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload>
          }
          createMany: {
            args: Prisma.superAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.superAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload>[]
          }
          delete: {
            args: Prisma.superAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload>
          }
          update: {
            args: Prisma.superAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload>
          }
          deleteMany: {
            args: Prisma.superAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.superAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.superAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$superAdminPayload>
          }
          aggregate: {
            args: Prisma.SuperAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuperAdmin>
          }
          groupBy: {
            args: Prisma.superAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuperAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.superAdminCountArgs<ExtArgs>
            result: $Utils.Optional<SuperAdminCountAggregateOutputType> | number
          }
        }
      }
      school: {
        payload: Prisma.$schoolPayload<ExtArgs>
        fields: Prisma.schoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.schoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.schoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload>
          }
          findFirst: {
            args: Prisma.schoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.schoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload>
          }
          findMany: {
            args: Prisma.schoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload>[]
          }
          create: {
            args: Prisma.schoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload>
          }
          createMany: {
            args: Prisma.schoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.schoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload>[]
          }
          delete: {
            args: Prisma.schoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload>
          }
          update: {
            args: Prisma.schoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload>
          }
          deleteMany: {
            args: Prisma.schoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.schoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.schoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schoolPayload>
          }
          aggregate: {
            args: Prisma.SchoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchool>
          }
          groupBy: {
            args: Prisma.schoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.schoolCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SuperAdminCountOutputType
   */

  export type SuperAdminCountOutputType = {
    school: number
  }

  export type SuperAdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SuperAdminCountOutputTypeCountSchoolArgs
  }

  // Custom InputTypes
  /**
   * SuperAdminCountOutputType without action
   */
  export type SuperAdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminCountOutputType
     */
    select?: SuperAdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SuperAdminCountOutputType without action
   */
  export type SuperAdminCountOutputTypeCountSchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: schoolWhereInput
  }


  /**
   * Models
   */

  /**
   * Model superAdmin
   */

  export type AggregateSuperAdmin = {
    _count: SuperAdminCountAggregateOutputType | null
    _min: SuperAdminMinAggregateOutputType | null
    _max: SuperAdminMaxAggregateOutputType | null
  }

  export type SuperAdminMinAggregateOutputType = {
    id: string | null
    fullname: string | null
    email: string | null
    password: string | null
    phone: string | null
    status: $Enums.status | null
    otp: string | null
    token: string | null
    verified: boolean | null
    role: $Enums.role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuperAdminMaxAggregateOutputType = {
    id: string | null
    fullname: string | null
    email: string | null
    password: string | null
    phone: string | null
    status: $Enums.status | null
    otp: string | null
    token: string | null
    verified: boolean | null
    role: $Enums.role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuperAdminCountAggregateOutputType = {
    id: number
    fullname: number
    email: number
    password: number
    phone: number
    status: number
    otp: number
    token: number
    verified: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SuperAdminMinAggregateInputType = {
    id?: true
    fullname?: true
    email?: true
    password?: true
    phone?: true
    status?: true
    otp?: true
    token?: true
    verified?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuperAdminMaxAggregateInputType = {
    id?: true
    fullname?: true
    email?: true
    password?: true
    phone?: true
    status?: true
    otp?: true
    token?: true
    verified?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuperAdminCountAggregateInputType = {
    id?: true
    fullname?: true
    email?: true
    password?: true
    phone?: true
    status?: true
    otp?: true
    token?: true
    verified?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SuperAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which superAdmin to aggregate.
     */
    where?: superAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superAdmins to fetch.
     */
    orderBy?: superAdminOrderByWithRelationInput | superAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: superAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned superAdmins
    **/
    _count?: true | SuperAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuperAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuperAdminMaxAggregateInputType
  }

  export type GetSuperAdminAggregateType<T extends SuperAdminAggregateArgs> = {
        [P in keyof T & keyof AggregateSuperAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuperAdmin[P]>
      : GetScalarType<T[P], AggregateSuperAdmin[P]>
  }




  export type superAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: superAdminWhereInput
    orderBy?: superAdminOrderByWithAggregationInput | superAdminOrderByWithAggregationInput[]
    by: SuperAdminScalarFieldEnum[] | SuperAdminScalarFieldEnum
    having?: superAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuperAdminCountAggregateInputType | true
    _min?: SuperAdminMinAggregateInputType
    _max?: SuperAdminMaxAggregateInputType
  }

  export type SuperAdminGroupByOutputType = {
    id: string
    fullname: string
    email: string
    password: string
    phone: string
    status: $Enums.status
    otp: string | null
    token: string | null
    verified: boolean
    role: $Enums.role
    createdAt: Date
    updatedAt: Date
    _count: SuperAdminCountAggregateOutputType | null
    _min: SuperAdminMinAggregateOutputType | null
    _max: SuperAdminMaxAggregateOutputType | null
  }

  type GetSuperAdminGroupByPayload<T extends superAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuperAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuperAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuperAdminGroupByOutputType[P]>
            : GetScalarType<T[P], SuperAdminGroupByOutputType[P]>
        }
      >
    >


  export type superAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    status?: boolean
    otp?: boolean
    token?: boolean
    verified?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | superAdmin$schoolArgs<ExtArgs>
    _count?: boolean | SuperAdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["superAdmin"]>

  export type superAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    status?: boolean
    otp?: boolean
    token?: boolean
    verified?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["superAdmin"]>

  export type superAdminSelectScalar = {
    id?: boolean
    fullname?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    status?: boolean
    otp?: boolean
    token?: boolean
    verified?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type superAdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | superAdmin$schoolArgs<ExtArgs>
    _count?: boolean | SuperAdminCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type superAdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $superAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "superAdmin"
    objects: {
      school: Prisma.$schoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullname: string
      email: string
      password: string
      phone: string
      status: $Enums.status
      otp: string | null
      token: string | null
      verified: boolean
      role: $Enums.role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["superAdmin"]>
    composites: {}
  }

  type superAdminGetPayload<S extends boolean | null | undefined | superAdminDefaultArgs> = $Result.GetResult<Prisma.$superAdminPayload, S>

  type superAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<superAdminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SuperAdminCountAggregateInputType | true
    }

  export interface superAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['superAdmin'], meta: { name: 'superAdmin' } }
    /**
     * Find zero or one SuperAdmin that matches the filter.
     * @param {superAdminFindUniqueArgs} args - Arguments to find a SuperAdmin
     * @example
     * // Get one SuperAdmin
     * const superAdmin = await prisma.superAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends superAdminFindUniqueArgs>(args: SelectSubset<T, superAdminFindUniqueArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SuperAdmin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {superAdminFindUniqueOrThrowArgs} args - Arguments to find a SuperAdmin
     * @example
     * // Get one SuperAdmin
     * const superAdmin = await prisma.superAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends superAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, superAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SuperAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superAdminFindFirstArgs} args - Arguments to find a SuperAdmin
     * @example
     * // Get one SuperAdmin
     * const superAdmin = await prisma.superAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends superAdminFindFirstArgs>(args?: SelectSubset<T, superAdminFindFirstArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SuperAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superAdminFindFirstOrThrowArgs} args - Arguments to find a SuperAdmin
     * @example
     * // Get one SuperAdmin
     * const superAdmin = await prisma.superAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends superAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, superAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SuperAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SuperAdmins
     * const superAdmins = await prisma.superAdmin.findMany()
     * 
     * // Get first 10 SuperAdmins
     * const superAdmins = await prisma.superAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const superAdminWithIdOnly = await prisma.superAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends superAdminFindManyArgs>(args?: SelectSubset<T, superAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SuperAdmin.
     * @param {superAdminCreateArgs} args - Arguments to create a SuperAdmin.
     * @example
     * // Create one SuperAdmin
     * const SuperAdmin = await prisma.superAdmin.create({
     *   data: {
     *     // ... data to create a SuperAdmin
     *   }
     * })
     * 
     */
    create<T extends superAdminCreateArgs>(args: SelectSubset<T, superAdminCreateArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SuperAdmins.
     * @param {superAdminCreateManyArgs} args - Arguments to create many SuperAdmins.
     * @example
     * // Create many SuperAdmins
     * const superAdmin = await prisma.superAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends superAdminCreateManyArgs>(args?: SelectSubset<T, superAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SuperAdmins and returns the data saved in the database.
     * @param {superAdminCreateManyAndReturnArgs} args - Arguments to create many SuperAdmins.
     * @example
     * // Create many SuperAdmins
     * const superAdmin = await prisma.superAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SuperAdmins and only return the `id`
     * const superAdminWithIdOnly = await prisma.superAdmin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends superAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, superAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SuperAdmin.
     * @param {superAdminDeleteArgs} args - Arguments to delete one SuperAdmin.
     * @example
     * // Delete one SuperAdmin
     * const SuperAdmin = await prisma.superAdmin.delete({
     *   where: {
     *     // ... filter to delete one SuperAdmin
     *   }
     * })
     * 
     */
    delete<T extends superAdminDeleteArgs>(args: SelectSubset<T, superAdminDeleteArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SuperAdmin.
     * @param {superAdminUpdateArgs} args - Arguments to update one SuperAdmin.
     * @example
     * // Update one SuperAdmin
     * const superAdmin = await prisma.superAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends superAdminUpdateArgs>(args: SelectSubset<T, superAdminUpdateArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SuperAdmins.
     * @param {superAdminDeleteManyArgs} args - Arguments to filter SuperAdmins to delete.
     * @example
     * // Delete a few SuperAdmins
     * const { count } = await prisma.superAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends superAdminDeleteManyArgs>(args?: SelectSubset<T, superAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SuperAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SuperAdmins
     * const superAdmin = await prisma.superAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends superAdminUpdateManyArgs>(args: SelectSubset<T, superAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SuperAdmin.
     * @param {superAdminUpsertArgs} args - Arguments to update or create a SuperAdmin.
     * @example
     * // Update or create a SuperAdmin
     * const superAdmin = await prisma.superAdmin.upsert({
     *   create: {
     *     // ... data to create a SuperAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SuperAdmin we want to update
     *   }
     * })
     */
    upsert<T extends superAdminUpsertArgs>(args: SelectSubset<T, superAdminUpsertArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SuperAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superAdminCountArgs} args - Arguments to filter SuperAdmins to count.
     * @example
     * // Count the number of SuperAdmins
     * const count = await prisma.superAdmin.count({
     *   where: {
     *     // ... the filter for the SuperAdmins we want to count
     *   }
     * })
    **/
    count<T extends superAdminCountArgs>(
      args?: Subset<T, superAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuperAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SuperAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SuperAdminAggregateArgs>(args: Subset<T, SuperAdminAggregateArgs>): Prisma.PrismaPromise<GetSuperAdminAggregateType<T>>

    /**
     * Group by SuperAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superAdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends superAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: superAdminGroupByArgs['orderBy'] }
        : { orderBy?: superAdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, superAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuperAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the superAdmin model
   */
  readonly fields: superAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for superAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__superAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends superAdmin$schoolArgs<ExtArgs> = {}>(args?: Subset<T, superAdmin$schoolArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the superAdmin model
   */ 
  interface superAdminFieldRefs {
    readonly id: FieldRef<"superAdmin", 'String'>
    readonly fullname: FieldRef<"superAdmin", 'String'>
    readonly email: FieldRef<"superAdmin", 'String'>
    readonly password: FieldRef<"superAdmin", 'String'>
    readonly phone: FieldRef<"superAdmin", 'String'>
    readonly status: FieldRef<"superAdmin", 'status'>
    readonly otp: FieldRef<"superAdmin", 'String'>
    readonly token: FieldRef<"superAdmin", 'String'>
    readonly verified: FieldRef<"superAdmin", 'Boolean'>
    readonly role: FieldRef<"superAdmin", 'role'>
    readonly createdAt: FieldRef<"superAdmin", 'DateTime'>
    readonly updatedAt: FieldRef<"superAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * superAdmin findUnique
   */
  export type superAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * Filter, which superAdmin to fetch.
     */
    where: superAdminWhereUniqueInput
  }

  /**
   * superAdmin findUniqueOrThrow
   */
  export type superAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * Filter, which superAdmin to fetch.
     */
    where: superAdminWhereUniqueInput
  }

  /**
   * superAdmin findFirst
   */
  export type superAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * Filter, which superAdmin to fetch.
     */
    where?: superAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superAdmins to fetch.
     */
    orderBy?: superAdminOrderByWithRelationInput | superAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for superAdmins.
     */
    cursor?: superAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of superAdmins.
     */
    distinct?: SuperAdminScalarFieldEnum | SuperAdminScalarFieldEnum[]
  }

  /**
   * superAdmin findFirstOrThrow
   */
  export type superAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * Filter, which superAdmin to fetch.
     */
    where?: superAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superAdmins to fetch.
     */
    orderBy?: superAdminOrderByWithRelationInput | superAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for superAdmins.
     */
    cursor?: superAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of superAdmins.
     */
    distinct?: SuperAdminScalarFieldEnum | SuperAdminScalarFieldEnum[]
  }

  /**
   * superAdmin findMany
   */
  export type superAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * Filter, which superAdmins to fetch.
     */
    where?: superAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superAdmins to fetch.
     */
    orderBy?: superAdminOrderByWithRelationInput | superAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing superAdmins.
     */
    cursor?: superAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superAdmins.
     */
    skip?: number
    distinct?: SuperAdminScalarFieldEnum | SuperAdminScalarFieldEnum[]
  }

  /**
   * superAdmin create
   */
  export type superAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * The data needed to create a superAdmin.
     */
    data: XOR<superAdminCreateInput, superAdminUncheckedCreateInput>
  }

  /**
   * superAdmin createMany
   */
  export type superAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many superAdmins.
     */
    data: superAdminCreateManyInput | superAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * superAdmin createManyAndReturn
   */
  export type superAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many superAdmins.
     */
    data: superAdminCreateManyInput | superAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * superAdmin update
   */
  export type superAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * The data needed to update a superAdmin.
     */
    data: XOR<superAdminUpdateInput, superAdminUncheckedUpdateInput>
    /**
     * Choose, which superAdmin to update.
     */
    where: superAdminWhereUniqueInput
  }

  /**
   * superAdmin updateMany
   */
  export type superAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update superAdmins.
     */
    data: XOR<superAdminUpdateManyMutationInput, superAdminUncheckedUpdateManyInput>
    /**
     * Filter which superAdmins to update
     */
    where?: superAdminWhereInput
  }

  /**
   * superAdmin upsert
   */
  export type superAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * The filter to search for the superAdmin to update in case it exists.
     */
    where: superAdminWhereUniqueInput
    /**
     * In case the superAdmin found by the `where` argument doesn't exist, create a new superAdmin with this data.
     */
    create: XOR<superAdminCreateInput, superAdminUncheckedCreateInput>
    /**
     * In case the superAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<superAdminUpdateInput, superAdminUncheckedUpdateInput>
  }

  /**
   * superAdmin delete
   */
  export type superAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
    /**
     * Filter which superAdmin to delete.
     */
    where: superAdminWhereUniqueInput
  }

  /**
   * superAdmin deleteMany
   */
  export type superAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which superAdmins to delete
     */
    where?: superAdminWhereInput
  }

  /**
   * superAdmin.school
   */
  export type superAdmin$schoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    where?: schoolWhereInput
    orderBy?: schoolOrderByWithRelationInput | schoolOrderByWithRelationInput[]
    cursor?: schoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * superAdmin without action
   */
  export type superAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the superAdmin
     */
    select?: superAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: superAdminInclude<ExtArgs> | null
  }


  /**
   * Model school
   */

  export type AggregateSchool = {
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  export type SchoolAvgAggregateOutputType = {
    maxtotalAdmins: number | null
  }

  export type SchoolSumAggregateOutputType = {
    maxtotalAdmins: number | null
  }

  export type SchoolMinAggregateOutputType = {
    id: string | null
    schoolName: string | null
    type: $Enums.schooltype | null
    feesRequired: boolean | null
    code: string | null
    maxtotalAdmins: number | null
    databaseName: string | null
    databaseUrl: string | null
    contact: string | null
    email: string | null
    logoUrl: string | null
    logoKey: string | null
    address: string | null
    subscription: boolean | null
    paymentStatus: $Enums.paymentStatus | null
    subscriptionDate: Date | null
    EndOfLife: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    superAdminId: string | null
  }

  export type SchoolMaxAggregateOutputType = {
    id: string | null
    schoolName: string | null
    type: $Enums.schooltype | null
    feesRequired: boolean | null
    code: string | null
    maxtotalAdmins: number | null
    databaseName: string | null
    databaseUrl: string | null
    contact: string | null
    email: string | null
    logoUrl: string | null
    logoKey: string | null
    address: string | null
    subscription: boolean | null
    paymentStatus: $Enums.paymentStatus | null
    subscriptionDate: Date | null
    EndOfLife: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    superAdminId: string | null
  }

  export type SchoolCountAggregateOutputType = {
    id: number
    schoolName: number
    type: number
    feesRequired: number
    code: number
    admins: number
    maxtotalAdmins: number
    databaseName: number
    databaseUrl: number
    contact: number
    email: number
    logoUrl: number
    logoKey: number
    address: number
    subscription: number
    paymentStatus: number
    subscriptionDate: number
    EndOfLife: number
    createdAt: number
    updatedAt: number
    superAdminId: number
    _all: number
  }


  export type SchoolAvgAggregateInputType = {
    maxtotalAdmins?: true
  }

  export type SchoolSumAggregateInputType = {
    maxtotalAdmins?: true
  }

  export type SchoolMinAggregateInputType = {
    id?: true
    schoolName?: true
    type?: true
    feesRequired?: true
    code?: true
    maxtotalAdmins?: true
    databaseName?: true
    databaseUrl?: true
    contact?: true
    email?: true
    logoUrl?: true
    logoKey?: true
    address?: true
    subscription?: true
    paymentStatus?: true
    subscriptionDate?: true
    EndOfLife?: true
    createdAt?: true
    updatedAt?: true
    superAdminId?: true
  }

  export type SchoolMaxAggregateInputType = {
    id?: true
    schoolName?: true
    type?: true
    feesRequired?: true
    code?: true
    maxtotalAdmins?: true
    databaseName?: true
    databaseUrl?: true
    contact?: true
    email?: true
    logoUrl?: true
    logoKey?: true
    address?: true
    subscription?: true
    paymentStatus?: true
    subscriptionDate?: true
    EndOfLife?: true
    createdAt?: true
    updatedAt?: true
    superAdminId?: true
  }

  export type SchoolCountAggregateInputType = {
    id?: true
    schoolName?: true
    type?: true
    feesRequired?: true
    code?: true
    admins?: true
    maxtotalAdmins?: true
    databaseName?: true
    databaseUrl?: true
    contact?: true
    email?: true
    logoUrl?: true
    logoKey?: true
    address?: true
    subscription?: true
    paymentStatus?: true
    subscriptionDate?: true
    EndOfLife?: true
    createdAt?: true
    updatedAt?: true
    superAdminId?: true
    _all?: true
  }

  export type SchoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which school to aggregate.
     */
    where?: schoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schools to fetch.
     */
    orderBy?: schoolOrderByWithRelationInput | schoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: schoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned schools
    **/
    _count?: true | SchoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolMaxAggregateInputType
  }

  export type GetSchoolAggregateType<T extends SchoolAggregateArgs> = {
        [P in keyof T & keyof AggregateSchool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchool[P]>
      : GetScalarType<T[P], AggregateSchool[P]>
  }




  export type schoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: schoolWhereInput
    orderBy?: schoolOrderByWithAggregationInput | schoolOrderByWithAggregationInput[]
    by: SchoolScalarFieldEnum[] | SchoolScalarFieldEnum
    having?: schoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolCountAggregateInputType | true
    _avg?: SchoolAvgAggregateInputType
    _sum?: SchoolSumAggregateInputType
    _min?: SchoolMinAggregateInputType
    _max?: SchoolMaxAggregateInputType
  }

  export type SchoolGroupByOutputType = {
    id: string
    schoolName: string
    type: $Enums.schooltype
    feesRequired: boolean
    code: string
    admins: string[]
    maxtotalAdmins: number
    databaseName: string
    databaseUrl: string
    contact: string | null
    email: string | null
    logoUrl: string | null
    logoKey: string | null
    address: string | null
    subscription: boolean
    paymentStatus: $Enums.paymentStatus
    subscriptionDate: Date
    EndOfLife: Date
    createdAt: Date
    updatedAt: Date
    superAdminId: string
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  type GetSchoolGroupByPayload<T extends schoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolGroupByOutputType[P]>
        }
      >
    >


  export type schoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolName?: boolean
    type?: boolean
    feesRequired?: boolean
    code?: boolean
    admins?: boolean
    maxtotalAdmins?: boolean
    databaseName?: boolean
    databaseUrl?: boolean
    contact?: boolean
    email?: boolean
    logoUrl?: boolean
    logoKey?: boolean
    address?: boolean
    subscription?: boolean
    paymentStatus?: boolean
    subscriptionDate?: boolean
    EndOfLife?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    superAdminId?: boolean
    superAdmin?: boolean | superAdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type schoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolName?: boolean
    type?: boolean
    feesRequired?: boolean
    code?: boolean
    admins?: boolean
    maxtotalAdmins?: boolean
    databaseName?: boolean
    databaseUrl?: boolean
    contact?: boolean
    email?: boolean
    logoUrl?: boolean
    logoKey?: boolean
    address?: boolean
    subscription?: boolean
    paymentStatus?: boolean
    subscriptionDate?: boolean
    EndOfLife?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    superAdminId?: boolean
    superAdmin?: boolean | superAdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type schoolSelectScalar = {
    id?: boolean
    schoolName?: boolean
    type?: boolean
    feesRequired?: boolean
    code?: boolean
    admins?: boolean
    maxtotalAdmins?: boolean
    databaseName?: boolean
    databaseUrl?: boolean
    contact?: boolean
    email?: boolean
    logoUrl?: boolean
    logoKey?: boolean
    address?: boolean
    subscription?: boolean
    paymentStatus?: boolean
    subscriptionDate?: boolean
    EndOfLife?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    superAdminId?: boolean
  }

  export type schoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    superAdmin?: boolean | superAdminDefaultArgs<ExtArgs>
  }
  export type schoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    superAdmin?: boolean | superAdminDefaultArgs<ExtArgs>
  }

  export type $schoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "school"
    objects: {
      superAdmin: Prisma.$superAdminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolName: string
      type: $Enums.schooltype
      feesRequired: boolean
      code: string
      admins: string[]
      maxtotalAdmins: number
      databaseName: string
      databaseUrl: string
      contact: string | null
      email: string | null
      logoUrl: string | null
      logoKey: string | null
      address: string | null
      subscription: boolean
      paymentStatus: $Enums.paymentStatus
      subscriptionDate: Date
      EndOfLife: Date
      createdAt: Date
      updatedAt: Date
      superAdminId: string
    }, ExtArgs["result"]["school"]>
    composites: {}
  }

  type schoolGetPayload<S extends boolean | null | undefined | schoolDefaultArgs> = $Result.GetResult<Prisma.$schoolPayload, S>

  type schoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<schoolFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SchoolCountAggregateInputType | true
    }

  export interface schoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['school'], meta: { name: 'school' } }
    /**
     * Find zero or one School that matches the filter.
     * @param {schoolFindUniqueArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends schoolFindUniqueArgs>(args: SelectSubset<T, schoolFindUniqueArgs<ExtArgs>>): Prisma__schoolClient<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one School that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {schoolFindUniqueOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends schoolFindUniqueOrThrowArgs>(args: SelectSubset<T, schoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__schoolClient<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first School that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schoolFindFirstArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends schoolFindFirstArgs>(args?: SelectSubset<T, schoolFindFirstArgs<ExtArgs>>): Prisma__schoolClient<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first School that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schoolFindFirstOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends schoolFindFirstOrThrowArgs>(args?: SelectSubset<T, schoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__schoolClient<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Schools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schools
     * const schools = await prisma.school.findMany()
     * 
     * // Get first 10 Schools
     * const schools = await prisma.school.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schoolWithIdOnly = await prisma.school.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends schoolFindManyArgs>(args?: SelectSubset<T, schoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a School.
     * @param {schoolCreateArgs} args - Arguments to create a School.
     * @example
     * // Create one School
     * const School = await prisma.school.create({
     *   data: {
     *     // ... data to create a School
     *   }
     * })
     * 
     */
    create<T extends schoolCreateArgs>(args: SelectSubset<T, schoolCreateArgs<ExtArgs>>): Prisma__schoolClient<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Schools.
     * @param {schoolCreateManyArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends schoolCreateManyArgs>(args?: SelectSubset<T, schoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schools and returns the data saved in the database.
     * @param {schoolCreateManyAndReturnArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schools and only return the `id`
     * const schoolWithIdOnly = await prisma.school.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends schoolCreateManyAndReturnArgs>(args?: SelectSubset<T, schoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a School.
     * @param {schoolDeleteArgs} args - Arguments to delete one School.
     * @example
     * // Delete one School
     * const School = await prisma.school.delete({
     *   where: {
     *     // ... filter to delete one School
     *   }
     * })
     * 
     */
    delete<T extends schoolDeleteArgs>(args: SelectSubset<T, schoolDeleteArgs<ExtArgs>>): Prisma__schoolClient<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one School.
     * @param {schoolUpdateArgs} args - Arguments to update one School.
     * @example
     * // Update one School
     * const school = await prisma.school.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends schoolUpdateArgs>(args: SelectSubset<T, schoolUpdateArgs<ExtArgs>>): Prisma__schoolClient<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Schools.
     * @param {schoolDeleteManyArgs} args - Arguments to filter Schools to delete.
     * @example
     * // Delete a few Schools
     * const { count } = await prisma.school.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends schoolDeleteManyArgs>(args?: SelectSubset<T, schoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends schoolUpdateManyArgs>(args: SelectSubset<T, schoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one School.
     * @param {schoolUpsertArgs} args - Arguments to update or create a School.
     * @example
     * // Update or create a School
     * const school = await prisma.school.upsert({
     *   create: {
     *     // ... data to create a School
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the School we want to update
     *   }
     * })
     */
    upsert<T extends schoolUpsertArgs>(args: SelectSubset<T, schoolUpsertArgs<ExtArgs>>): Prisma__schoolClient<$Result.GetResult<Prisma.$schoolPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schoolCountArgs} args - Arguments to filter Schools to count.
     * @example
     * // Count the number of Schools
     * const count = await prisma.school.count({
     *   where: {
     *     // ... the filter for the Schools we want to count
     *   }
     * })
    **/
    count<T extends schoolCountArgs>(
      args?: Subset<T, schoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchoolAggregateArgs>(args: Subset<T, SchoolAggregateArgs>): Prisma.PrismaPromise<GetSchoolAggregateType<T>>

    /**
     * Group by School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends schoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: schoolGroupByArgs['orderBy'] }
        : { orderBy?: schoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, schoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the school model
   */
  readonly fields: schoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for school.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__schoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    superAdmin<T extends superAdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, superAdminDefaultArgs<ExtArgs>>): Prisma__superAdminClient<$Result.GetResult<Prisma.$superAdminPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the school model
   */ 
  interface schoolFieldRefs {
    readonly id: FieldRef<"school", 'String'>
    readonly schoolName: FieldRef<"school", 'String'>
    readonly type: FieldRef<"school", 'schooltype'>
    readonly feesRequired: FieldRef<"school", 'Boolean'>
    readonly code: FieldRef<"school", 'String'>
    readonly admins: FieldRef<"school", 'String[]'>
    readonly maxtotalAdmins: FieldRef<"school", 'Int'>
    readonly databaseName: FieldRef<"school", 'String'>
    readonly databaseUrl: FieldRef<"school", 'String'>
    readonly contact: FieldRef<"school", 'String'>
    readonly email: FieldRef<"school", 'String'>
    readonly logoUrl: FieldRef<"school", 'String'>
    readonly logoKey: FieldRef<"school", 'String'>
    readonly address: FieldRef<"school", 'String'>
    readonly subscription: FieldRef<"school", 'Boolean'>
    readonly paymentStatus: FieldRef<"school", 'paymentStatus'>
    readonly subscriptionDate: FieldRef<"school", 'DateTime'>
    readonly EndOfLife: FieldRef<"school", 'DateTime'>
    readonly createdAt: FieldRef<"school", 'DateTime'>
    readonly updatedAt: FieldRef<"school", 'DateTime'>
    readonly superAdminId: FieldRef<"school", 'String'>
  }
    

  // Custom InputTypes
  /**
   * school findUnique
   */
  export type schoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * Filter, which school to fetch.
     */
    where: schoolWhereUniqueInput
  }

  /**
   * school findUniqueOrThrow
   */
  export type schoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * Filter, which school to fetch.
     */
    where: schoolWhereUniqueInput
  }

  /**
   * school findFirst
   */
  export type schoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * Filter, which school to fetch.
     */
    where?: schoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schools to fetch.
     */
    orderBy?: schoolOrderByWithRelationInput | schoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for schools.
     */
    cursor?: schoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * school findFirstOrThrow
   */
  export type schoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * Filter, which school to fetch.
     */
    where?: schoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schools to fetch.
     */
    orderBy?: schoolOrderByWithRelationInput | schoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for schools.
     */
    cursor?: schoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * school findMany
   */
  export type schoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * Filter, which schools to fetch.
     */
    where?: schoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schools to fetch.
     */
    orderBy?: schoolOrderByWithRelationInput | schoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing schools.
     */
    cursor?: schoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schools.
     */
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * school create
   */
  export type schoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * The data needed to create a school.
     */
    data: XOR<schoolCreateInput, schoolUncheckedCreateInput>
  }

  /**
   * school createMany
   */
  export type schoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many schools.
     */
    data: schoolCreateManyInput | schoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * school createManyAndReturn
   */
  export type schoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many schools.
     */
    data: schoolCreateManyInput | schoolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * school update
   */
  export type schoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * The data needed to update a school.
     */
    data: XOR<schoolUpdateInput, schoolUncheckedUpdateInput>
    /**
     * Choose, which school to update.
     */
    where: schoolWhereUniqueInput
  }

  /**
   * school updateMany
   */
  export type schoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update schools.
     */
    data: XOR<schoolUpdateManyMutationInput, schoolUncheckedUpdateManyInput>
    /**
     * Filter which schools to update
     */
    where?: schoolWhereInput
  }

  /**
   * school upsert
   */
  export type schoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * The filter to search for the school to update in case it exists.
     */
    where: schoolWhereUniqueInput
    /**
     * In case the school found by the `where` argument doesn't exist, create a new school with this data.
     */
    create: XOR<schoolCreateInput, schoolUncheckedCreateInput>
    /**
     * In case the school was found with the provided `where` argument, update it with this data.
     */
    update: XOR<schoolUpdateInput, schoolUncheckedUpdateInput>
  }

  /**
   * school delete
   */
  export type schoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
    /**
     * Filter which school to delete.
     */
    where: schoolWhereUniqueInput
  }

  /**
   * school deleteMany
   */
  export type schoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which schools to delete
     */
    where?: schoolWhereInput
  }

  /**
   * school without action
   */
  export type schoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the school
     */
    select?: schoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schoolInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SuperAdminScalarFieldEnum: {
    id: 'id',
    fullname: 'fullname',
    email: 'email',
    password: 'password',
    phone: 'phone',
    status: 'status',
    otp: 'otp',
    token: 'token',
    verified: 'verified',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SuperAdminScalarFieldEnum = (typeof SuperAdminScalarFieldEnum)[keyof typeof SuperAdminScalarFieldEnum]


  export const SchoolScalarFieldEnum: {
    id: 'id',
    schoolName: 'schoolName',
    type: 'type',
    feesRequired: 'feesRequired',
    code: 'code',
    admins: 'admins',
    maxtotalAdmins: 'maxtotalAdmins',
    databaseName: 'databaseName',
    databaseUrl: 'databaseUrl',
    contact: 'contact',
    email: 'email',
    logoUrl: 'logoUrl',
    logoKey: 'logoKey',
    address: 'address',
    subscription: 'subscription',
    paymentStatus: 'paymentStatus',
    subscriptionDate: 'subscriptionDate',
    EndOfLife: 'EndOfLife',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    superAdminId: 'superAdminId'
  };

  export type SchoolScalarFieldEnum = (typeof SchoolScalarFieldEnum)[keyof typeof SchoolScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'status'
   */
  export type EnumstatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'status'>
    


  /**
   * Reference to a field of type 'status[]'
   */
  export type ListEnumstatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'status[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'role'
   */
  export type EnumroleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'role'>
    


  /**
   * Reference to a field of type 'role[]'
   */
  export type ListEnumroleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'schooltype'
   */
  export type EnumschooltypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'schooltype'>
    


  /**
   * Reference to a field of type 'schooltype[]'
   */
  export type ListEnumschooltypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'schooltype[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'paymentStatus'
   */
  export type EnumpaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'paymentStatus'>
    


  /**
   * Reference to a field of type 'paymentStatus[]'
   */
  export type ListEnumpaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'paymentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type superAdminWhereInput = {
    AND?: superAdminWhereInput | superAdminWhereInput[]
    OR?: superAdminWhereInput[]
    NOT?: superAdminWhereInput | superAdminWhereInput[]
    id?: StringFilter<"superAdmin"> | string
    fullname?: StringFilter<"superAdmin"> | string
    email?: StringFilter<"superAdmin"> | string
    password?: StringFilter<"superAdmin"> | string
    phone?: StringFilter<"superAdmin"> | string
    status?: EnumstatusFilter<"superAdmin"> | $Enums.status
    otp?: StringNullableFilter<"superAdmin"> | string | null
    token?: StringNullableFilter<"superAdmin"> | string | null
    verified?: BoolFilter<"superAdmin"> | boolean
    role?: EnumroleFilter<"superAdmin"> | $Enums.role
    createdAt?: DateTimeFilter<"superAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"superAdmin"> | Date | string
    school?: SchoolListRelationFilter
  }

  export type superAdminOrderByWithRelationInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    otp?: SortOrderInput | SortOrder
    token?: SortOrderInput | SortOrder
    verified?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    school?: schoolOrderByRelationAggregateInput
  }

  export type superAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: superAdminWhereInput | superAdminWhereInput[]
    OR?: superAdminWhereInput[]
    NOT?: superAdminWhereInput | superAdminWhereInput[]
    fullname?: StringFilter<"superAdmin"> | string
    password?: StringFilter<"superAdmin"> | string
    status?: EnumstatusFilter<"superAdmin"> | $Enums.status
    otp?: StringNullableFilter<"superAdmin"> | string | null
    token?: StringNullableFilter<"superAdmin"> | string | null
    verified?: BoolFilter<"superAdmin"> | boolean
    role?: EnumroleFilter<"superAdmin"> | $Enums.role
    createdAt?: DateTimeFilter<"superAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"superAdmin"> | Date | string
    school?: SchoolListRelationFilter
  }, "id" | "email" | "phone">

  export type superAdminOrderByWithAggregationInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    otp?: SortOrderInput | SortOrder
    token?: SortOrderInput | SortOrder
    verified?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: superAdminCountOrderByAggregateInput
    _max?: superAdminMaxOrderByAggregateInput
    _min?: superAdminMinOrderByAggregateInput
  }

  export type superAdminScalarWhereWithAggregatesInput = {
    AND?: superAdminScalarWhereWithAggregatesInput | superAdminScalarWhereWithAggregatesInput[]
    OR?: superAdminScalarWhereWithAggregatesInput[]
    NOT?: superAdminScalarWhereWithAggregatesInput | superAdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"superAdmin"> | string
    fullname?: StringWithAggregatesFilter<"superAdmin"> | string
    email?: StringWithAggregatesFilter<"superAdmin"> | string
    password?: StringWithAggregatesFilter<"superAdmin"> | string
    phone?: StringWithAggregatesFilter<"superAdmin"> | string
    status?: EnumstatusWithAggregatesFilter<"superAdmin"> | $Enums.status
    otp?: StringNullableWithAggregatesFilter<"superAdmin"> | string | null
    token?: StringNullableWithAggregatesFilter<"superAdmin"> | string | null
    verified?: BoolWithAggregatesFilter<"superAdmin"> | boolean
    role?: EnumroleWithAggregatesFilter<"superAdmin"> | $Enums.role
    createdAt?: DateTimeWithAggregatesFilter<"superAdmin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"superAdmin"> | Date | string
  }

  export type schoolWhereInput = {
    AND?: schoolWhereInput | schoolWhereInput[]
    OR?: schoolWhereInput[]
    NOT?: schoolWhereInput | schoolWhereInput[]
    id?: StringFilter<"school"> | string
    schoolName?: StringFilter<"school"> | string
    type?: EnumschooltypeFilter<"school"> | $Enums.schooltype
    feesRequired?: BoolFilter<"school"> | boolean
    code?: StringFilter<"school"> | string
    admins?: StringNullableListFilter<"school">
    maxtotalAdmins?: IntFilter<"school"> | number
    databaseName?: StringFilter<"school"> | string
    databaseUrl?: StringFilter<"school"> | string
    contact?: StringNullableFilter<"school"> | string | null
    email?: StringNullableFilter<"school"> | string | null
    logoUrl?: StringNullableFilter<"school"> | string | null
    logoKey?: StringNullableFilter<"school"> | string | null
    address?: StringNullableFilter<"school"> | string | null
    subscription?: BoolFilter<"school"> | boolean
    paymentStatus?: EnumpaymentStatusFilter<"school"> | $Enums.paymentStatus
    subscriptionDate?: DateTimeFilter<"school"> | Date | string
    EndOfLife?: DateTimeFilter<"school"> | Date | string
    createdAt?: DateTimeFilter<"school"> | Date | string
    updatedAt?: DateTimeFilter<"school"> | Date | string
    superAdminId?: StringFilter<"school"> | string
    superAdmin?: XOR<SuperAdminRelationFilter, superAdminWhereInput>
  }

  export type schoolOrderByWithRelationInput = {
    id?: SortOrder
    schoolName?: SortOrder
    type?: SortOrder
    feesRequired?: SortOrder
    code?: SortOrder
    admins?: SortOrder
    maxtotalAdmins?: SortOrder
    databaseName?: SortOrder
    databaseUrl?: SortOrder
    contact?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    logoKey?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    subscription?: SortOrder
    paymentStatus?: SortOrder
    subscriptionDate?: SortOrder
    EndOfLife?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    superAdminId?: SortOrder
    superAdmin?: superAdminOrderByWithRelationInput
  }

  export type schoolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    databaseName?: string
    AND?: schoolWhereInput | schoolWhereInput[]
    OR?: schoolWhereInput[]
    NOT?: schoolWhereInput | schoolWhereInput[]
    schoolName?: StringFilter<"school"> | string
    type?: EnumschooltypeFilter<"school"> | $Enums.schooltype
    feesRequired?: BoolFilter<"school"> | boolean
    admins?: StringNullableListFilter<"school">
    maxtotalAdmins?: IntFilter<"school"> | number
    databaseUrl?: StringFilter<"school"> | string
    contact?: StringNullableFilter<"school"> | string | null
    email?: StringNullableFilter<"school"> | string | null
    logoUrl?: StringNullableFilter<"school"> | string | null
    logoKey?: StringNullableFilter<"school"> | string | null
    address?: StringNullableFilter<"school"> | string | null
    subscription?: BoolFilter<"school"> | boolean
    paymentStatus?: EnumpaymentStatusFilter<"school"> | $Enums.paymentStatus
    subscriptionDate?: DateTimeFilter<"school"> | Date | string
    EndOfLife?: DateTimeFilter<"school"> | Date | string
    createdAt?: DateTimeFilter<"school"> | Date | string
    updatedAt?: DateTimeFilter<"school"> | Date | string
    superAdminId?: StringFilter<"school"> | string
    superAdmin?: XOR<SuperAdminRelationFilter, superAdminWhereInput>
  }, "id" | "code" | "databaseName">

  export type schoolOrderByWithAggregationInput = {
    id?: SortOrder
    schoolName?: SortOrder
    type?: SortOrder
    feesRequired?: SortOrder
    code?: SortOrder
    admins?: SortOrder
    maxtotalAdmins?: SortOrder
    databaseName?: SortOrder
    databaseUrl?: SortOrder
    contact?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    logoKey?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    subscription?: SortOrder
    paymentStatus?: SortOrder
    subscriptionDate?: SortOrder
    EndOfLife?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    superAdminId?: SortOrder
    _count?: schoolCountOrderByAggregateInput
    _avg?: schoolAvgOrderByAggregateInput
    _max?: schoolMaxOrderByAggregateInput
    _min?: schoolMinOrderByAggregateInput
    _sum?: schoolSumOrderByAggregateInput
  }

  export type schoolScalarWhereWithAggregatesInput = {
    AND?: schoolScalarWhereWithAggregatesInput | schoolScalarWhereWithAggregatesInput[]
    OR?: schoolScalarWhereWithAggregatesInput[]
    NOT?: schoolScalarWhereWithAggregatesInput | schoolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"school"> | string
    schoolName?: StringWithAggregatesFilter<"school"> | string
    type?: EnumschooltypeWithAggregatesFilter<"school"> | $Enums.schooltype
    feesRequired?: BoolWithAggregatesFilter<"school"> | boolean
    code?: StringWithAggregatesFilter<"school"> | string
    admins?: StringNullableListFilter<"school">
    maxtotalAdmins?: IntWithAggregatesFilter<"school"> | number
    databaseName?: StringWithAggregatesFilter<"school"> | string
    databaseUrl?: StringWithAggregatesFilter<"school"> | string
    contact?: StringNullableWithAggregatesFilter<"school"> | string | null
    email?: StringNullableWithAggregatesFilter<"school"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"school"> | string | null
    logoKey?: StringNullableWithAggregatesFilter<"school"> | string | null
    address?: StringNullableWithAggregatesFilter<"school"> | string | null
    subscription?: BoolWithAggregatesFilter<"school"> | boolean
    paymentStatus?: EnumpaymentStatusWithAggregatesFilter<"school"> | $Enums.paymentStatus
    subscriptionDate?: DateTimeWithAggregatesFilter<"school"> | Date | string
    EndOfLife?: DateTimeWithAggregatesFilter<"school"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"school"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"school"> | Date | string
    superAdminId?: StringWithAggregatesFilter<"school"> | string
  }

  export type superAdminCreateInput = {
    id?: string
    fullname: string
    email: string
    password: string
    phone: string
    status?: $Enums.status
    otp?: string | null
    token?: string | null
    verified?: boolean
    role?: $Enums.role
    createdAt?: Date | string
    updatedAt?: Date | string
    school?: schoolCreateNestedManyWithoutSuperAdminInput
  }

  export type superAdminUncheckedCreateInput = {
    id?: string
    fullname: string
    email: string
    password: string
    phone: string
    status?: $Enums.status
    otp?: string | null
    token?: string | null
    verified?: boolean
    role?: $Enums.role
    createdAt?: Date | string
    updatedAt?: Date | string
    school?: schoolUncheckedCreateNestedManyWithoutSuperAdminInput
  }

  export type superAdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: schoolUpdateManyWithoutSuperAdminNestedInput
  }

  export type superAdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: schoolUncheckedUpdateManyWithoutSuperAdminNestedInput
  }

  export type superAdminCreateManyInput = {
    id?: string
    fullname: string
    email: string
    password: string
    phone: string
    status?: $Enums.status
    otp?: string | null
    token?: string | null
    verified?: boolean
    role?: $Enums.role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type superAdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type superAdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type schoolCreateInput = {
    id?: string
    schoolName: string
    type: $Enums.schooltype
    feesRequired?: boolean
    code: string
    admins?: schoolCreateadminsInput | string[]
    maxtotalAdmins?: number
    databaseName: string
    databaseUrl: string
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    logoKey?: string | null
    address?: string | null
    subscription?: boolean
    paymentStatus?: $Enums.paymentStatus
    subscriptionDate: Date | string
    EndOfLife: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    superAdmin: superAdminCreateNestedOneWithoutSchoolInput
  }

  export type schoolUncheckedCreateInput = {
    id?: string
    schoolName: string
    type: $Enums.schooltype
    feesRequired?: boolean
    code: string
    admins?: schoolCreateadminsInput | string[]
    maxtotalAdmins?: number
    databaseName: string
    databaseUrl: string
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    logoKey?: string | null
    address?: string | null
    subscription?: boolean
    paymentStatus?: $Enums.paymentStatus
    subscriptionDate: Date | string
    EndOfLife: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    superAdminId: string
  }

  export type schoolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolName?: StringFieldUpdateOperationsInput | string
    type?: EnumschooltypeFieldUpdateOperationsInput | $Enums.schooltype
    feesRequired?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
    admins?: schoolUpdateadminsInput | string[]
    maxtotalAdmins?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoKey?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    subscription?: BoolFieldUpdateOperationsInput | boolean
    paymentStatus?: EnumpaymentStatusFieldUpdateOperationsInput | $Enums.paymentStatus
    subscriptionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndOfLife?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    superAdmin?: superAdminUpdateOneRequiredWithoutSchoolNestedInput
  }

  export type schoolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolName?: StringFieldUpdateOperationsInput | string
    type?: EnumschooltypeFieldUpdateOperationsInput | $Enums.schooltype
    feesRequired?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
    admins?: schoolUpdateadminsInput | string[]
    maxtotalAdmins?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoKey?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    subscription?: BoolFieldUpdateOperationsInput | boolean
    paymentStatus?: EnumpaymentStatusFieldUpdateOperationsInput | $Enums.paymentStatus
    subscriptionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndOfLife?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    superAdminId?: StringFieldUpdateOperationsInput | string
  }

  export type schoolCreateManyInput = {
    id?: string
    schoolName: string
    type: $Enums.schooltype
    feesRequired?: boolean
    code: string
    admins?: schoolCreateadminsInput | string[]
    maxtotalAdmins?: number
    databaseName: string
    databaseUrl: string
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    logoKey?: string | null
    address?: string | null
    subscription?: boolean
    paymentStatus?: $Enums.paymentStatus
    subscriptionDate: Date | string
    EndOfLife: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    superAdminId: string
  }

  export type schoolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolName?: StringFieldUpdateOperationsInput | string
    type?: EnumschooltypeFieldUpdateOperationsInput | $Enums.schooltype
    feesRequired?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
    admins?: schoolUpdateadminsInput | string[]
    maxtotalAdmins?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoKey?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    subscription?: BoolFieldUpdateOperationsInput | boolean
    paymentStatus?: EnumpaymentStatusFieldUpdateOperationsInput | $Enums.paymentStatus
    subscriptionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndOfLife?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type schoolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolName?: StringFieldUpdateOperationsInput | string
    type?: EnumschooltypeFieldUpdateOperationsInput | $Enums.schooltype
    feesRequired?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
    admins?: schoolUpdateadminsInput | string[]
    maxtotalAdmins?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoKey?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    subscription?: BoolFieldUpdateOperationsInput | boolean
    paymentStatus?: EnumpaymentStatusFieldUpdateOperationsInput | $Enums.paymentStatus
    subscriptionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndOfLife?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    superAdminId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumstatusFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel>
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    not?: NestedEnumstatusFilter<$PrismaModel> | $Enums.status
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumroleFilter<$PrismaModel = never> = {
    equals?: $Enums.role | EnumroleFieldRefInput<$PrismaModel>
    in?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    notIn?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    not?: NestedEnumroleFilter<$PrismaModel> | $Enums.role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SchoolListRelationFilter = {
    every?: schoolWhereInput
    some?: schoolWhereInput
    none?: schoolWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type schoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type superAdminCountOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    otp?: SortOrder
    token?: SortOrder
    verified?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type superAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    otp?: SortOrder
    token?: SortOrder
    verified?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type superAdminMinOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    otp?: SortOrder
    token?: SortOrder
    verified?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumstatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel>
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    not?: NestedEnumstatusWithAggregatesFilter<$PrismaModel> | $Enums.status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumstatusFilter<$PrismaModel>
    _max?: NestedEnumstatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumroleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.role | EnumroleFieldRefInput<$PrismaModel>
    in?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    notIn?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    not?: NestedEnumroleWithAggregatesFilter<$PrismaModel> | $Enums.role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumroleFilter<$PrismaModel>
    _max?: NestedEnumroleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumschooltypeFilter<$PrismaModel = never> = {
    equals?: $Enums.schooltype | EnumschooltypeFieldRefInput<$PrismaModel>
    in?: $Enums.schooltype[] | ListEnumschooltypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.schooltype[] | ListEnumschooltypeFieldRefInput<$PrismaModel>
    not?: NestedEnumschooltypeFilter<$PrismaModel> | $Enums.schooltype
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumpaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.paymentStatus | EnumpaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.paymentStatus[] | ListEnumpaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.paymentStatus[] | ListEnumpaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumpaymentStatusFilter<$PrismaModel> | $Enums.paymentStatus
  }

  export type SuperAdminRelationFilter = {
    is?: superAdminWhereInput
    isNot?: superAdminWhereInput
  }

  export type schoolCountOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    type?: SortOrder
    feesRequired?: SortOrder
    code?: SortOrder
    admins?: SortOrder
    maxtotalAdmins?: SortOrder
    databaseName?: SortOrder
    databaseUrl?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    logoUrl?: SortOrder
    logoKey?: SortOrder
    address?: SortOrder
    subscription?: SortOrder
    paymentStatus?: SortOrder
    subscriptionDate?: SortOrder
    EndOfLife?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    superAdminId?: SortOrder
  }

  export type schoolAvgOrderByAggregateInput = {
    maxtotalAdmins?: SortOrder
  }

  export type schoolMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    type?: SortOrder
    feesRequired?: SortOrder
    code?: SortOrder
    maxtotalAdmins?: SortOrder
    databaseName?: SortOrder
    databaseUrl?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    logoUrl?: SortOrder
    logoKey?: SortOrder
    address?: SortOrder
    subscription?: SortOrder
    paymentStatus?: SortOrder
    subscriptionDate?: SortOrder
    EndOfLife?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    superAdminId?: SortOrder
  }

  export type schoolMinOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    type?: SortOrder
    feesRequired?: SortOrder
    code?: SortOrder
    maxtotalAdmins?: SortOrder
    databaseName?: SortOrder
    databaseUrl?: SortOrder
    contact?: SortOrder
    email?: SortOrder
    logoUrl?: SortOrder
    logoKey?: SortOrder
    address?: SortOrder
    subscription?: SortOrder
    paymentStatus?: SortOrder
    subscriptionDate?: SortOrder
    EndOfLife?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    superAdminId?: SortOrder
  }

  export type schoolSumOrderByAggregateInput = {
    maxtotalAdmins?: SortOrder
  }

  export type EnumschooltypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.schooltype | EnumschooltypeFieldRefInput<$PrismaModel>
    in?: $Enums.schooltype[] | ListEnumschooltypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.schooltype[] | ListEnumschooltypeFieldRefInput<$PrismaModel>
    not?: NestedEnumschooltypeWithAggregatesFilter<$PrismaModel> | $Enums.schooltype
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumschooltypeFilter<$PrismaModel>
    _max?: NestedEnumschooltypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumpaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.paymentStatus | EnumpaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.paymentStatus[] | ListEnumpaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.paymentStatus[] | ListEnumpaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumpaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.paymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumpaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumpaymentStatusFilter<$PrismaModel>
  }

  export type schoolCreateNestedManyWithoutSuperAdminInput = {
    create?: XOR<schoolCreateWithoutSuperAdminInput, schoolUncheckedCreateWithoutSuperAdminInput> | schoolCreateWithoutSuperAdminInput[] | schoolUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: schoolCreateOrConnectWithoutSuperAdminInput | schoolCreateOrConnectWithoutSuperAdminInput[]
    createMany?: schoolCreateManySuperAdminInputEnvelope
    connect?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
  }

  export type schoolUncheckedCreateNestedManyWithoutSuperAdminInput = {
    create?: XOR<schoolCreateWithoutSuperAdminInput, schoolUncheckedCreateWithoutSuperAdminInput> | schoolCreateWithoutSuperAdminInput[] | schoolUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: schoolCreateOrConnectWithoutSuperAdminInput | schoolCreateOrConnectWithoutSuperAdminInput[]
    createMany?: schoolCreateManySuperAdminInputEnvelope
    connect?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumstatusFieldUpdateOperationsInput = {
    set?: $Enums.status
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumroleFieldUpdateOperationsInput = {
    set?: $Enums.role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type schoolUpdateManyWithoutSuperAdminNestedInput = {
    create?: XOR<schoolCreateWithoutSuperAdminInput, schoolUncheckedCreateWithoutSuperAdminInput> | schoolCreateWithoutSuperAdminInput[] | schoolUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: schoolCreateOrConnectWithoutSuperAdminInput | schoolCreateOrConnectWithoutSuperAdminInput[]
    upsert?: schoolUpsertWithWhereUniqueWithoutSuperAdminInput | schoolUpsertWithWhereUniqueWithoutSuperAdminInput[]
    createMany?: schoolCreateManySuperAdminInputEnvelope
    set?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
    disconnect?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
    delete?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
    connect?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
    update?: schoolUpdateWithWhereUniqueWithoutSuperAdminInput | schoolUpdateWithWhereUniqueWithoutSuperAdminInput[]
    updateMany?: schoolUpdateManyWithWhereWithoutSuperAdminInput | schoolUpdateManyWithWhereWithoutSuperAdminInput[]
    deleteMany?: schoolScalarWhereInput | schoolScalarWhereInput[]
  }

  export type schoolUncheckedUpdateManyWithoutSuperAdminNestedInput = {
    create?: XOR<schoolCreateWithoutSuperAdminInput, schoolUncheckedCreateWithoutSuperAdminInput> | schoolCreateWithoutSuperAdminInput[] | schoolUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: schoolCreateOrConnectWithoutSuperAdminInput | schoolCreateOrConnectWithoutSuperAdminInput[]
    upsert?: schoolUpsertWithWhereUniqueWithoutSuperAdminInput | schoolUpsertWithWhereUniqueWithoutSuperAdminInput[]
    createMany?: schoolCreateManySuperAdminInputEnvelope
    set?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
    disconnect?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
    delete?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
    connect?: schoolWhereUniqueInput | schoolWhereUniqueInput[]
    update?: schoolUpdateWithWhereUniqueWithoutSuperAdminInput | schoolUpdateWithWhereUniqueWithoutSuperAdminInput[]
    updateMany?: schoolUpdateManyWithWhereWithoutSuperAdminInput | schoolUpdateManyWithWhereWithoutSuperAdminInput[]
    deleteMany?: schoolScalarWhereInput | schoolScalarWhereInput[]
  }

  export type schoolCreateadminsInput = {
    set: string[]
  }

  export type superAdminCreateNestedOneWithoutSchoolInput = {
    create?: XOR<superAdminCreateWithoutSchoolInput, superAdminUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: superAdminCreateOrConnectWithoutSchoolInput
    connect?: superAdminWhereUniqueInput
  }

  export type EnumschooltypeFieldUpdateOperationsInput = {
    set?: $Enums.schooltype
  }

  export type schoolUpdateadminsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumpaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.paymentStatus
  }

  export type superAdminUpdateOneRequiredWithoutSchoolNestedInput = {
    create?: XOR<superAdminCreateWithoutSchoolInput, superAdminUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: superAdminCreateOrConnectWithoutSchoolInput
    upsert?: superAdminUpsertWithoutSchoolInput
    connect?: superAdminWhereUniqueInput
    update?: XOR<XOR<superAdminUpdateToOneWithWhereWithoutSchoolInput, superAdminUpdateWithoutSchoolInput>, superAdminUncheckedUpdateWithoutSchoolInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumstatusFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel>
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    not?: NestedEnumstatusFilter<$PrismaModel> | $Enums.status
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumroleFilter<$PrismaModel = never> = {
    equals?: $Enums.role | EnumroleFieldRefInput<$PrismaModel>
    in?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    notIn?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    not?: NestedEnumroleFilter<$PrismaModel> | $Enums.role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumstatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel>
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel>
    not?: NestedEnumstatusWithAggregatesFilter<$PrismaModel> | $Enums.status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumstatusFilter<$PrismaModel>
    _max?: NestedEnumstatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumroleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.role | EnumroleFieldRefInput<$PrismaModel>
    in?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    notIn?: $Enums.role[] | ListEnumroleFieldRefInput<$PrismaModel>
    not?: NestedEnumroleWithAggregatesFilter<$PrismaModel> | $Enums.role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumroleFilter<$PrismaModel>
    _max?: NestedEnumroleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumschooltypeFilter<$PrismaModel = never> = {
    equals?: $Enums.schooltype | EnumschooltypeFieldRefInput<$PrismaModel>
    in?: $Enums.schooltype[] | ListEnumschooltypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.schooltype[] | ListEnumschooltypeFieldRefInput<$PrismaModel>
    not?: NestedEnumschooltypeFilter<$PrismaModel> | $Enums.schooltype
  }

  export type NestedEnumpaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.paymentStatus | EnumpaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.paymentStatus[] | ListEnumpaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.paymentStatus[] | ListEnumpaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumpaymentStatusFilter<$PrismaModel> | $Enums.paymentStatus
  }

  export type NestedEnumschooltypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.schooltype | EnumschooltypeFieldRefInput<$PrismaModel>
    in?: $Enums.schooltype[] | ListEnumschooltypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.schooltype[] | ListEnumschooltypeFieldRefInput<$PrismaModel>
    not?: NestedEnumschooltypeWithAggregatesFilter<$PrismaModel> | $Enums.schooltype
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumschooltypeFilter<$PrismaModel>
    _max?: NestedEnumschooltypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumpaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.paymentStatus | EnumpaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.paymentStatus[] | ListEnumpaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.paymentStatus[] | ListEnumpaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumpaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.paymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumpaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumpaymentStatusFilter<$PrismaModel>
  }

  export type schoolCreateWithoutSuperAdminInput = {
    id?: string
    schoolName: string
    type: $Enums.schooltype
    feesRequired?: boolean
    code: string
    admins?: schoolCreateadminsInput | string[]
    maxtotalAdmins?: number
    databaseName: string
    databaseUrl: string
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    logoKey?: string | null
    address?: string | null
    subscription?: boolean
    paymentStatus?: $Enums.paymentStatus
    subscriptionDate: Date | string
    EndOfLife: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type schoolUncheckedCreateWithoutSuperAdminInput = {
    id?: string
    schoolName: string
    type: $Enums.schooltype
    feesRequired?: boolean
    code: string
    admins?: schoolCreateadminsInput | string[]
    maxtotalAdmins?: number
    databaseName: string
    databaseUrl: string
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    logoKey?: string | null
    address?: string | null
    subscription?: boolean
    paymentStatus?: $Enums.paymentStatus
    subscriptionDate: Date | string
    EndOfLife: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type schoolCreateOrConnectWithoutSuperAdminInput = {
    where: schoolWhereUniqueInput
    create: XOR<schoolCreateWithoutSuperAdminInput, schoolUncheckedCreateWithoutSuperAdminInput>
  }

  export type schoolCreateManySuperAdminInputEnvelope = {
    data: schoolCreateManySuperAdminInput | schoolCreateManySuperAdminInput[]
    skipDuplicates?: boolean
  }

  export type schoolUpsertWithWhereUniqueWithoutSuperAdminInput = {
    where: schoolWhereUniqueInput
    update: XOR<schoolUpdateWithoutSuperAdminInput, schoolUncheckedUpdateWithoutSuperAdminInput>
    create: XOR<schoolCreateWithoutSuperAdminInput, schoolUncheckedCreateWithoutSuperAdminInput>
  }

  export type schoolUpdateWithWhereUniqueWithoutSuperAdminInput = {
    where: schoolWhereUniqueInput
    data: XOR<schoolUpdateWithoutSuperAdminInput, schoolUncheckedUpdateWithoutSuperAdminInput>
  }

  export type schoolUpdateManyWithWhereWithoutSuperAdminInput = {
    where: schoolScalarWhereInput
    data: XOR<schoolUpdateManyMutationInput, schoolUncheckedUpdateManyWithoutSuperAdminInput>
  }

  export type schoolScalarWhereInput = {
    AND?: schoolScalarWhereInput | schoolScalarWhereInput[]
    OR?: schoolScalarWhereInput[]
    NOT?: schoolScalarWhereInput | schoolScalarWhereInput[]
    id?: StringFilter<"school"> | string
    schoolName?: StringFilter<"school"> | string
    type?: EnumschooltypeFilter<"school"> | $Enums.schooltype
    feesRequired?: BoolFilter<"school"> | boolean
    code?: StringFilter<"school"> | string
    admins?: StringNullableListFilter<"school">
    maxtotalAdmins?: IntFilter<"school"> | number
    databaseName?: StringFilter<"school"> | string
    databaseUrl?: StringFilter<"school"> | string
    contact?: StringNullableFilter<"school"> | string | null
    email?: StringNullableFilter<"school"> | string | null
    logoUrl?: StringNullableFilter<"school"> | string | null
    logoKey?: StringNullableFilter<"school"> | string | null
    address?: StringNullableFilter<"school"> | string | null
    subscription?: BoolFilter<"school"> | boolean
    paymentStatus?: EnumpaymentStatusFilter<"school"> | $Enums.paymentStatus
    subscriptionDate?: DateTimeFilter<"school"> | Date | string
    EndOfLife?: DateTimeFilter<"school"> | Date | string
    createdAt?: DateTimeFilter<"school"> | Date | string
    updatedAt?: DateTimeFilter<"school"> | Date | string
    superAdminId?: StringFilter<"school"> | string
  }

  export type superAdminCreateWithoutSchoolInput = {
    id?: string
    fullname: string
    email: string
    password: string
    phone: string
    status?: $Enums.status
    otp?: string | null
    token?: string | null
    verified?: boolean
    role?: $Enums.role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type superAdminUncheckedCreateWithoutSchoolInput = {
    id?: string
    fullname: string
    email: string
    password: string
    phone: string
    status?: $Enums.status
    otp?: string | null
    token?: string | null
    verified?: boolean
    role?: $Enums.role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type superAdminCreateOrConnectWithoutSchoolInput = {
    where: superAdminWhereUniqueInput
    create: XOR<superAdminCreateWithoutSchoolInput, superAdminUncheckedCreateWithoutSchoolInput>
  }

  export type superAdminUpsertWithoutSchoolInput = {
    update: XOR<superAdminUpdateWithoutSchoolInput, superAdminUncheckedUpdateWithoutSchoolInput>
    create: XOR<superAdminCreateWithoutSchoolInput, superAdminUncheckedCreateWithoutSchoolInput>
    where?: superAdminWhereInput
  }

  export type superAdminUpdateToOneWithWhereWithoutSchoolInput = {
    where?: superAdminWhereInput
    data: XOR<superAdminUpdateWithoutSchoolInput, superAdminUncheckedUpdateWithoutSchoolInput>
  }

  export type superAdminUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type superAdminUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: EnumstatusFieldUpdateOperationsInput | $Enums.status
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    token?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumroleFieldUpdateOperationsInput | $Enums.role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type schoolCreateManySuperAdminInput = {
    id?: string
    schoolName: string
    type: $Enums.schooltype
    feesRequired?: boolean
    code: string
    admins?: schoolCreateadminsInput | string[]
    maxtotalAdmins?: number
    databaseName: string
    databaseUrl: string
    contact?: string | null
    email?: string | null
    logoUrl?: string | null
    logoKey?: string | null
    address?: string | null
    subscription?: boolean
    paymentStatus?: $Enums.paymentStatus
    subscriptionDate: Date | string
    EndOfLife: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type schoolUpdateWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolName?: StringFieldUpdateOperationsInput | string
    type?: EnumschooltypeFieldUpdateOperationsInput | $Enums.schooltype
    feesRequired?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
    admins?: schoolUpdateadminsInput | string[]
    maxtotalAdmins?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoKey?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    subscription?: BoolFieldUpdateOperationsInput | boolean
    paymentStatus?: EnumpaymentStatusFieldUpdateOperationsInput | $Enums.paymentStatus
    subscriptionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndOfLife?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type schoolUncheckedUpdateWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolName?: StringFieldUpdateOperationsInput | string
    type?: EnumschooltypeFieldUpdateOperationsInput | $Enums.schooltype
    feesRequired?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
    admins?: schoolUpdateadminsInput | string[]
    maxtotalAdmins?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoKey?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    subscription?: BoolFieldUpdateOperationsInput | boolean
    paymentStatus?: EnumpaymentStatusFieldUpdateOperationsInput | $Enums.paymentStatus
    subscriptionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndOfLife?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type schoolUncheckedUpdateManyWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolName?: StringFieldUpdateOperationsInput | string
    type?: EnumschooltypeFieldUpdateOperationsInput | $Enums.schooltype
    feesRequired?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
    admins?: schoolUpdateadminsInput | string[]
    maxtotalAdmins?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoKey?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    subscription?: BoolFieldUpdateOperationsInput | boolean
    paymentStatus?: EnumpaymentStatusFieldUpdateOperationsInput | $Enums.paymentStatus
    subscriptionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndOfLife?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use SuperAdminCountOutputTypeDefaultArgs instead
     */
    export type SuperAdminCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SuperAdminCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use superAdminDefaultArgs instead
     */
    export type superAdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = superAdminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use schoolDefaultArgs instead
     */
    export type schoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = schoolDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}