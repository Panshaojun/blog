import { MetaApi } from './models/Meta'
import { EssayApi } from './models/Essay'
import { FileApi } from './models/File'
import { CommentApi } from './models/Comment'
import { UserApi } from './models/User'
import { OptionsApi } from './models/Options'

export const Meta = new MetaApi();
export const Essay = new EssayApi();
export const File = new FileApi();
export const Comment = new CommentApi();
export const User = new UserApi();
export const Options = new OptionsApi();