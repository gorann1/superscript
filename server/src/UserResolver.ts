import { Int } from 'type-graphql';
import { sendRefreshToken } from './sendRefreshToken';
import { createRefreshToken, createAccessToken } from './auth';
import { MyContext } from './MyContext';
import { 
  Ctx, 
  Field, 
  ObjectType, 
  UseMiddleware 
} from 'type-graphql';
import { 
  Arg, 
  Mutation, 
  Query, 
  Resolver 
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from './entity/User';
import { isAuth } from './isAuth';
import { getConnection } from 'typeorm';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

@Resolver()

export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hi';
  }


  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(
    @Ctx() {payload}: MyContext) {
      console.log(payload);
    return `your user ID is: ${payload!.userId}`;
  }

  

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(
    @Arg('userid', () => Int) userId:number
  ) {
    await getConnection().getRepository(User)
    .increment({ id: userId}, 'tokenVersion', 1)
    
    return true;
  }

  
  @Mutation(() => LoginResponse)
  
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() {res}: MyContext
    ): Promise < LoginResponse>
    {

    const user = await User.findOne({ where: {email} });

    if(!user) {
      throw new Error ('could not find user')
    }

    const valid =await compare(password, user.password)

    if(!valid) {
      throw new Error ('bad password')
    }

    // login succesfull
    sendRefreshToken(res, createRefreshToken(user));


    return {
      accessToken: createAccessToken(user)
     };
  }


  @Mutation(() => Boolean)
  
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {

    const hashedPassword = await hash(password, 12) 

    try { await User.insert({
      email,
      password: hashedPassword
    });
  } catch (err){
      console.log(err);
      return false;
  }

    return true
  }


}