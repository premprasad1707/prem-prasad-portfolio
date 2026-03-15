import Text "mo:core/Text";

actor {
  type ContactInfo = {
    name : Text;
    email : Text;
    linkedInUrl : Text;
    githubUrl : Text;
  };

  let contactInfo : ContactInfo = {
    name = "Prem Prasad";
    email = "prem.prasad@example.com";
    linkedInUrl = "https://www.linkedin.com/in/prem-prasad";
    githubUrl = "https://github.com/premprasad";
  };

  public query ({ caller }) func getContactInfo() : async ContactInfo {
    contactInfo;
  };
};
