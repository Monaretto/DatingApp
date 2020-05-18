using Microsoft.AspNetCore.Http;

namespace DatingApp.API.helpers
{
    public static class Extension
    {
        public static void AddAplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers","ApplicatioN-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");        
        }
    }
}