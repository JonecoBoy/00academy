import { injectable } from "inversify";
import { EmailServiceInterface, SendEmailParams } from "../../core/providers/email-service.interface";
import { SES } from 'aws-sdk';

@injectable()
export class EmailService implements EmailServiceInterface {
    
    
    private _sdkSES: SES;   

    constructor() {

        this._sdkSES = new SES({
            region: process.env.AWS_REGION,  
            credentials: {
                accessKeyId: process.env.AWS_PUBLIC_TOKEN,
                secretAccessKey: process.env.AWS_PRIVATE_TOKEN,
            }
        });

    }

    
    async send(model: SendEmailParams): Promise<void> {

        try {
            
            const params = {
                Destination: {
                    ToAddresses: [
                        model.toAddress,
                    ],
                },
                Message: { 
                        Body: { 
                        
                        Text: {
                            Charset: "UTF-8",
                            Data: model.message
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: model.subject
                    }
                },
                // Source: 'no-reply@tatamefinder.com.br', /* required */
                Source: model.fromAddress, /* required */
            }

            const result = await this._sdkSES.sendEmail(params).promise();
    
            console.log(result);

            return;

        } catch (error) {
            
            console.log(error);

            throw new Error(error.message);
            

        }


        
    
    }

}
