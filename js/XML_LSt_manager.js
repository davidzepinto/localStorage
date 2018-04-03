function main()
{
    var xml_d = new XML_Data("xml/My_database.xml");
    var localS = new LocalStorageXML(xml_d);
    xml_d.readXML();
    localS.saveXMLLS();
    localS.readXMLLS();
}