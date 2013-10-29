using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace Mintence.Server.Controllers
{
    public class AtdResponse
    {
        public AtdResults results { get; set; }
    }
    public class AtdResults
    {
        public AtdError error { get; set; }
    }
    public class AtdError
    {
        [XmlElement(ElementName = "string")]
        [JsonProperty(PropertyName = "sentence")]
        public string stringElement { get; set; }
        public string description { get; set; }
        public string precontext { get; set; }
        public string type { get; set; }
    }
}
