// EmployeeController.cs

using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;

public class EmployeeController : Controller
{
    public ActionResult ProcessData()
    {
        // Process JSON data
        string jsonPathProduction = Server.MapPath("~/App_Data/production_jobs_data.json");
        string jsonStringProduction = System.IO.File.ReadAllText(jsonPathProduction);
        JObject jsonDataProduction = JObject.Parse(jsonStringProduction);
        ViewBag.ProductionJobsData = jsonDataProduction;

        // Process XML data
        string xmlPath = Server.MapPath("~/App_Data/employee_data.xml");
        XDocument xmlData = XDocument.Load(xmlPath);
        ViewBag.EmployeeDataXml = xmlData;

        return View();
    }
}
