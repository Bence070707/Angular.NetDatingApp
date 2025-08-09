using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        // This class can be used to define common functionality for all API controllers
        // For example, you can add methods for handling errors or logging
        // Currently, it serves as a base class for other API controllers
        
    }
}
