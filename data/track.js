window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.meta = {
  "code": "ZCNA",
  "brand": "ZyeemZia™",
  "name": "Certified Network Associate",
  "full": "ZyeemZia™ Certified Network Associate",
  "short": "ZCNA",
  "domain": "zcna.zyeemzia.com",
  "pdf": "ZCNA-Book.pdf",
  "storeKey": "zcna.v1",
  "tagline": "Build networks that just work.",
  "lead": "A modern, hands-on associate certification for the people who keep networks running: how packets travel, IPv4 and IPv6 addressing, switching and routing, everyday IP services, Wi-Fi, security fundamentals and the automation every new engineer now needs.",
  "signature": {
    "type": "path",
    "name": "The ZCNA Packet Journey",
    "centerSub": "Packet Journey",
    "caption": "Follow one packet across eight hops: the wire it rides on, its address, the switch and router that move it, the services it uses, the air it crosses, the guards that inspect it and the code that automates it all."
  },
  "hours": "60–70",
  "level": "Associate",
  "audience": [
    "Students and fresh graduates in CSE/EEE/ICT",
    "IT support and helpdesk staff moving into networking",
    "Junior network and system engineers",
    "Career changers starting in infrastructure"
  ],
  "passMark": 80,
  "distinctionMark": 90,
  "examSize": 40,
  "examMinutes": 60,
  "capstone": {
    "title": "Capstone: Build a branch office network end to end",
    "brief": "Design, configure and document the network for a realistic 60-person branch office (for example a bank branch in Chattogram or a software house in Dhaka), using a virtual lab or packet simulator.",
    "deliverables": [
      "Requirements summary and simple topology diagram",
      "IPv4 addressing plan with VLSM and an IPv6 plan",
      "VLAN, trunk and spanning-tree design with configurations",
      "Inter-VLAN routing and static/OSPF routing with verification output",
      "DHCP, DNS, NAT/PAT and NTP services configured",
      "Secure small-office Wi-Fi design (SSIDs, WPA3, channels)",
      "ACLs, port security and device hardening checklist",
      "A small automation script or playbook that backs up configurations",
      "Troubleshooting log for at least three faults you introduced and fixed",
      "One-page handover document for the support team"
    ],
    "rubric": [
      {
        "criterion": "Addressing",
        "levels": [
          "Errors or overlaps",
          "Correct plan",
          "Efficient VLSM plus IPv6 with growth room"
        ]
      },
      {
        "criterion": "Switching",
        "levels": [
          "VLANs only",
          "VLANs, trunks and STP correct",
          "Plus protection features and verified root placement"
        ]
      },
      {
        "criterion": "Routing",
        "levels": [
          "Partial reachability",
          "Full reachability",
          "Verified OSPF with sensible design choices"
        ]
      },
      {
        "criterion": "Services",
        "levels": [
          "Some services missing",
          "All services work",
          "Documented and resilient (relay, redundancy)"
        ]
      },
      {
        "criterion": "Wireless",
        "levels": [
          "Not addressed",
          "Working design",
          "Secure, interference-aware design"
        ]
      },
      {
        "criterion": "Security",
        "levels": [
          "Defaults left",
          "ACLs and hardening applied",
          "Least-privilege policy with evidence"
        ]
      },
      {
        "criterion": "Automation",
        "levels": [
          "None",
          "Script runs",
          "Reusable, documented and safe"
        ]
      },
      {
        "criterion": "Troubleshooting & docs",
        "levels": [
          "No evidence",
          "Log and handover present",
          "Clear, reproducible and professional"
        ]
      }
    ]
  },
  "certificate": {
    "title": "Certificate of Achievement",
    "statement": "has successfully completed all modules of the ZyeemZia™ Certified Network Associate track and passed the ZCNA certification exam",
    "skills": [
      "IPv4/IPv6 addressing & subnetting",
      "Switching & VLANs",
      "Routing & OSPF",
      "IP services & Wi-Fi",
      "Security & automation basics"
    ]
  },
  "disclaimer": "ZCNA is an independent certification programme created and issued by ZyeemZia. It is not affiliated with, endorsed by, sponsored by or equivalent to any certification from Cisco Systems, Inc. (including CCNA®, CCNP®, CCIE® and CCDE®) or from any other vendor or certifying body. All product names and trademarks belong to their respective owners. Configuration examples use widely taught, vendor-neutral style syntax.",
  "studyPlan": [
    [
      "Week 1",
      "m1 Wire",
      "Build a lab, capture packets"
    ],
    [
      "Week 2",
      "m2 Address",
      "Subnet 50 addresses, plan IPv6"
    ],
    [
      "Week 3",
      "m3 Switch",
      "VLANs, trunks, STP lab"
    ],
    [
      "Week 4",
      "m4 Route",
      "Static and OSPF lab"
    ],
    [
      "Week 5",
      "m5 Serve",
      "DHCP, NAT, DNS lab"
    ],
    [
      "Week 6",
      "m6 Air",
      "Design a small office WLAN"
    ],
    [
      "Week 7",
      "m7 Guard",
      "ACL and port-security lab"
    ],
    [
      "Week 8",
      "m8 Automate",
      "Backup script, capstone, exam"
    ]
  ]
};
