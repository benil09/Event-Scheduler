
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN,GOOGLE_CALENDAR_ID } from '../config/env.js'
import { google } from 'googleapis'
import { findBookingById } from '../repositories/booking.repository.js'
import { notFound } from '../utils/api-error.js'



const SCOPES = ["https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",

]


    
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

        const {data} = await oauth2.userinfo.get(); // failing
        // instead of returning we should set this refresh token to redis
    return {
            refreshToken:tokens.refresh_token,
            email:data.email??'-',
            avatar:data.picture??'-',
            name:data.name??'-'
    }
}

export async function getGoogleCalendarClient(){
    if(!isGoogleCalendarConfigured()){
        throw new Error("Google Calendar is not configured ")
    }

    const client = getOauthClient();
    client.setCredentials({
       refresh_token:GOOGLE_REFRESH_TOKEN // this should be ideally returned from redis
        
    })

    return client;
}


export async function createGoogleCalenderEvent(bookingId:number){
    const booking = await findBookingById(bookingId);
    if (!booking || booking.status !== 'CONFIRMED') {
        throw notFound("Booking not found")
    }

    const client = await getGoogleCalendarClient();

    const calendar = google.calendar({
        version: 'v3',
        auth: client
    });
    const event = await calendar.events.insert({
        calendarId:GOOGLE_CALENDAR_ID,
        conferenceDataVersion: 1,
        sendUpdates: 'all',
        requestBody: {
            summary: `${booking.eventType.title} with ${booking.host.name} is confirmed`,
            description: [
                booking.eventType.description,
                booking.inviteeNote ? `Invitee note: ${booking.inviteeNote}` : '',
            ].filter(Boolean).join('\n\n'),
            start: {
                dateTime: booking.slot.startAt.toISOString(),
                timeZone: booking.host.timezone,
            },
            end: {
                dateTime: booking.slot.endAt.toISOString(),
                timeZone: booking.host.timezone,
            },
            attendees: [
                { email: booking.host.Email, displayName: booking.host.name },
                { email: booking.inviteeEmail, displayName: booking.inviteeName },
            ],
            conferenceData: {
                createRequest: {
                    requestId: booking.id.toString(),
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    }
                }
            }
        }
    });

    return event;
}