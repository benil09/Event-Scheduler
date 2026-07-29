import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '../config/env.js'
import { google } from 'googleapis'



const SCOPES = ["https://www.googleapis.com/auth/calendar",
"https://www.googleapis.com/auth/calendar.events"]


    
export function isGoogleCalendarConfigured() :boolean{
    return Boolean(GOOGLE_CLIENT_ID &&
    GOOGLE_CLIENT_SECRET &&
    GOOGLE_REDIRECT_URI)
}

export function getOauthClient() {
    if(!isGoogleCalendarConfigured()) {
        throw new Error("Google Calendar not configured")
    
    }

    return new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    )

}

export function getSetupAuthUrl(){
    const client = getOauthClient();
    return client.generateAuthUrl({
        access_type:"offline",
        scope:SCOPES,
        prompt:"consent",
        state:'setup'
    })
    
}

export async function exchangeSetupCode(code:string){
        const client = getOauthClient();
        const {tokens} = await client.getToken(code);
        if(!tokens.refresh_token){
            throw new Error('No refresh token returned - user may have denied')
        }

        client.setCredentials(tokens)

        const oauth2 = google.oauth2({
            version:'v2',
            auth:client
        })

        const {data} = await oauth2.userinfo.get();

        return {
            refreshToken:tokens.refresh_token,
            email:data.email??'-',
            avatar:data.picture??'-',
            name:data.name??'-'
        }

        
        
}