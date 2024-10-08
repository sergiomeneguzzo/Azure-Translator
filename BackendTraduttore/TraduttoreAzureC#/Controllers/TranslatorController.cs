using Azure.AI.Translation.Text;
using Azure;
using Microsoft.AspNetCore.Mvc;
using TraduttoreAzureC_.Class;

[ApiController]
[Route("translator")]
public class TranslatorController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public TranslatorController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<ActionResult<ResponseTranslaction>> GetTranslation([FromBody] RequestTraductor request)
    {
        if (request == null || string.IsNullOrEmpty(request.input) || string.IsNullOrEmpty(request.targetLanguage))
        {
            return BadRequest(new ResponseTranslaction { message = "Input text and target language are required." });
        }

        try
        {
            string azureKey = _configuration["AzureTextAnalytics:ApiKey"];
            string azureRegion = _configuration["AzureTextAnalytics:Region"];

            AzureKeyCredential myAzureCredential = new AzureKeyCredential(azureKey);
            TextTranslationClient myTextTraslationClient = new TextTranslationClient(myAzureCredential, azureRegion);

            var response = await myTextTraslationClient.TranslateAsync(request.targetLanguage, new[] { request.input });

            var translatedText = response.Value.FirstOrDefault()?.Translations.FirstOrDefault()?.Text;
            var detectedLanguage = response.Value.FirstOrDefault()?.DetectedLanguage?.ToString() ?? "Unknown";

            var translationResponse = new ResponseTranslaction
            {
                dectedLanguage = detectedLanguage,
                translation = translatedText ?? "No translation available",
                message = "Translation successful"
            };

            return Ok(translationResponse);
        }
        catch (RequestFailedException ex)
        {
            return StatusCode(500, new ResponseTranslaction { message = "Translation service failed: " + ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ResponseTranslaction { message = "An unexpected error occurred: " + ex.Message });
        }
    }
}
