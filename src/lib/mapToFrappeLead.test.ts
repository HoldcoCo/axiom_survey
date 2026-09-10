import { describe, expect, it } from "vitest";
import {
  mapToFrappeLead,
  mapToFrappeOpportunity,
  splitLeadName,
} from "@/lib/mapToFrappeLead";

describe("splitLeadName", () => {
  it("never returns an empty first_name", () => {
    expect(splitLeadName("").first_name).toBe("Lead");
    expect(splitLeadName("   ").first_name).toBe("Lead");
  });

  it("splits first and last name", () => {
    expect(splitLeadName("Sarah Al-Mansoori")).toEqual({
      first_name: "Sarah",
      last_name: "Al-Mansoori",
    });
  });

  it("keeps a single token as first_name", () => {
    expect(splitLeadName("Sara")).toEqual({
      first_name: "Sara",
      last_name: "",
    });
  });
});

describe("mapToFrappeLead", () => {
  it("maps form fields onto ERPNext Lead keys", () => {
    const doc = mapToFrappeLead({
      name: "Sara Mansoori",
      company: "Holdco",
      email: "sara@example.ae",
      phone: "+971501234567",
      whatsapp: "",
    });
    expect(doc.lead_name).toBe("Sara Mansoori");
    expect(doc.first_name).toBe("Sara");
    expect(doc.last_name).toBe("Mansoori");
    expect(doc.company_name).toBe("Holdco");
    expect(doc.email_id).toBe("sara@example.ae");
    expect(doc.phone).toBe("+971501234567");
    expect(doc.mobile_no).toBe("+971501234567");
    expect(doc.source).toBe("Website");
    expect(doc.request_type).toBeUndefined();
  });

  it("prefers WhatsApp for mobile_no when provided", () => {
    const doc = mapToFrappeLead({
      name: "Sara",
      company: "",
      email: "a@b.co",
      phone: "+971500000000",
      whatsapp: "+971511111111",
    });
    expect(doc.mobile_no).toBe("+971511111111");
  });
});

describe("mapToFrappeOpportunity", () => {
  it("links the Opportunity to the Lead and attaches a CRM Note", () => {
    const doc = mapToFrappeOpportunity({
      leadName: "CRM-LEAD-2026-00006",
      name: "Henry Daher",
      company: "Henry Org.",
      email: "henry@example.com",
      phone: "+961111",
      whatsapp: "",
      companyAccount: "HOLDCO",
      opportunityType: "Sales",
    });
    expect(doc.opportunity_from).toBe("Lead");
    expect(doc.party_name).toBe("CRM-LEAD-2026-00006");
    expect(doc.company).toBe("HOLDCO");
    expect(doc.customer_name).toBe("Henry Org.");
    expect(doc.opportunity_type).toBe("Sales");
    expect(doc.naming_series).toBe("CRM-OPP-.YYYY.-");
    expect(doc.contact_person).toBeUndefined();
    expect(doc.notes).toBeUndefined();
  });
});
