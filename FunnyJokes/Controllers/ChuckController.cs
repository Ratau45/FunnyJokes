using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;



namespace FunnyJokes.Controllers
{
    // INSTRUCTIONS NUMBER 1: IT WAS SPECIFIED THAT THE API SHOULD HAVE ROOT PATHS. "CHUCK" IS THE FIRST ROOT PATH,
    // HENCE WHY THE CONTROLLER NAME IS CHUCK AND ALSO THE NEXT FOLLOWING LINE OF CODE: [Route("chuck"). THAT SPECIFIES THE ROOT PATH, WHICH IS CHUCK
    [Route("chuck")]
    [ApiController]
    public class ChuckController : ControllerBase
    {
        string BASE_API_URL = "https://api.chucknorris.io/";

        /*  THE COMMENTS BELOW ARE USED TO DESCRIBE THE ACTION OR ENDPOINT SPECIFYING IT'S DESCRIPTION, WHAT IT DOES,
         *  WHAT IT RETURNS, WHAT THE ENDPOINT MIGHT EXPECT ETC. WHEN DELETING COMMENTS, LEAVE THE BELOW COMMENTS THAT START WITH A TRIPLE SLASH.
         *  TO FIND OUT MORE, GO TO https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-6.0&tabs=visual-studio
         */

        /// <summary>
        /// Get all the joke categories.
        /// </summary>
        /// <returns>A list of all the joke categories</returns>
        /// <response code="200">Returns all the joe categories</response>
        /// <response code="500">Internal Error</response>

        
        [HttpGet]
        public async Task<ActionResult> GetCategories()
        {
            try
            {
                List<string>? categories = new List<string>();

                using (var httpCient = new HttpClient())
                {
                    var response = await httpCient.GetAsync(BASE_API_URL + "jokes/categories");
                    if (response.IsSuccessStatusCode)
                    {
                        categories = await response.Content.ReadFromJsonAsync<List<string>>();
                    }
                }

                return Ok(categories);
            } catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }

       

    }
}
