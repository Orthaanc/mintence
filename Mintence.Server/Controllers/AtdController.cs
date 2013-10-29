using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace Mintence.Server.Controllers
{
    public class AtdController : ApiController
    {
        private string namespaceElement = "<?xml version=\"1.0\" encoding=\"utf-8\"?><AtdResponse xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">";
        private string closingNamespaceElement = "</AtdResponse>";
        public async Task<HttpResponseMessage> Get(string data)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://127.0.0.1:1027/checkDocument?data=" + data);
            HttpResponseMessage validateResponse = await client.GetAsync("http://127.0.0.1:1049/checkDocument?data=" + data);
            string validateResponseContent = await validateResponse.Content.ReadAsStringAsync();
            validateResponseContent = namespaceElement + validateResponseContent + closingNamespaceElement;
            XElement responseElement = XElement.Parse(validateResponseContent);
            if (((XElement)responseElement.DescendantNodes().First()).DescendantNodes().Count() == 0)
            {
                // return valid if no problems
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                XmlSerializer serializer = XmlSerializer.FromTypes( new Type[]{typeof(AtdResponse)}).ToList()[0];
                
                AtdResponse responseObj = (AtdResponse)serializer.Deserialize(responseElement.CreateReader());

                return Request.CreateResponse(HttpStatusCode.OK, responseObj);
                // return invalid because you have bad grammar or spell
            }
        }
    }
}