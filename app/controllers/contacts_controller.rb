class ContactsController < ApplicationController
  
  
    #GET request to /cotact-us
    #Show new contact form
    def new
        @contact = Contact.new
    end
    
    
    #POST request /contacts
    def create
    #Mass Assignment of form fields into contact object    
      @contact = Contact.new(contact_params)
      if @contact.save
          #Store form fields via parameters into variables
          name = params[:contact][:name]
          email = params[:contact][:email]
          body = params[:contact][:comments]
          #Plug variables into Contact Mailer 
          #email method and send
          ContactMailer.contact_email(name, email, body).deliver
          flash[:success] = "Message Sent"
         redirect_to new_contact_path
      else
          flash[:danger] = @contact.errors.full_messages.join(", ")
         redirect_to new_contact_path
      end
    end

    private
    #To collect data from form we need to use
    #strong parameters and whitelist to form fields
        def contact_params
            params.require(:contact).permit(:name, :email, :comments)
        end
end
