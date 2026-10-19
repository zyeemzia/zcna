window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.modules.push({
 "id": "m5",
 "order": 5,
 "code": "Serve",
 "title": "IP Services",
 "subtitle": "DHCP, DNS, NAT, time, monitoring, secure management and QoS — the services every packet depends on.",
 "outcomes": [
  "Configure and troubleshoot DHCP servers and relays, and explain DNS resolution and record types.",
  "Configure static NAT, dynamic NAT and PAT and read a translation table confidently.",
  "Set up NTP, SNMPv3 and syslog so devices are observable and their logs are trustworthy.",
  "Manage devices securely with SSH and choose safe protocols for file transfer.",
  "Explain QoS marking, queuing, policing and shaping and read a basic QoS policy."
 ],
 "lessons": [
  {
   "id": "m5-l1",
   "title": "DHCP and DNS — Addresses and Names on Demand",
   "subtitle": "How a host gets its IP settings automatically and turns names into addresses.",
   "minutes": 30,
   "objectives": [
    "Walk through the four DHCP messages (DORA) and explain why the first two are broadcasts.",
    "Configure a router as a DHCP server and as a DHCP relay with `ip helper-address`.",
    "Describe recursive DNS resolution and choose the right DNS record type for a job."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "In the **ZCNA Packet Journey** the packet has a wire, an address, a switch path and a route. Now it needs **services**. The first two it meets are almost invisible when they work and painfully obvious when they fail: **DHCP** gives a host its IP settings, and **DNS** turns the name a user types into an address the network can route. A large share of \"the network is down\" tickets are really DHCP or DNS problems, so an associate engineer must be able to prove quickly whether they are working."
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Discover",
       "text": "Client → broadcast. Source 0.0.0.0:68, destination 255.255.255.255:67. \"Is there a DHCP server out there?\""
      },
      {
       "label": "Offer",
       "text": "Server → client. Proposes 192.168.10.21/24, gateway, DNS servers and a lease time."
      },
      {
       "label": "Request",
       "text": "Client → broadcast. \"I accept the offer from this server\" — broadcast so any other servers that made offers withdraw them."
      },
      {
       "label": "Ack",
       "text": "Server → client. Confirms the lease; the client configures the address and (on most systems) probes it to detect a duplicate before using it."
      }
     ],
     "title": "DORA — a client joins VLAN 10 and asks for an address"
    },
    {
     "type": "keypoints",
     "items": [
      "IP address and subnet mask (the lease).",
      "Default gateway (option 3) and DNS server list (option 6).",
      "Domain name (option 15) and lease duration (option 51).",
      "Special-purpose options, for example option 43 or 60 for vendor-specific data, or option 150/66 to point IP phones at a file server."
     ],
     "title": "What DHCP hands out (common options)"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A client tries to **renew** directly with its server at 50% of the lease (T1) and, if that fails, **rebinds** by broadcast at 87.5% (T2). If the lease expires with no answer the host must stop using the address. Short leases suit busy guest Wi-Fi; longer leases suit stable office desktops.",
     "title": "Leases are borrowed, not owned"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "! Reserve addresses for the gateway, servers and printers",
      "R1(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.20",
      "R1(config)# ip dhcp pool VLAN10-STAFF",
      "R1(dhcp-config)#  network 192.168.10.0 255.255.255.0",
      "R1(dhcp-config)#  default-router 192.168.10.1",
      "R1(dhcp-config)#  dns-server 192.168.10.5 192.168.10.6",
      "R1(dhcp-config)#  domain-name branch.example",
      "R1(dhcp-config)#  lease 7",
      "R1(dhcp-config)# end",
      "R1# show ip dhcp binding",
      "IP address       Client-ID/Hardware address    Lease expiration          Type",
      "192.168.10.21    0100.5056.a1b2.c3             Oct 26 2026 09:14 AM      Automatic"
     ],
     "title": "Router as a DHCP server",
     "note": "Exclusions are configured globally, outside the pool. Forgetting them is the classic cause of duplicate-address conflicts with statically addressed devices."
    },
    {
     "type": "text",
     "text": "DHCP Discover is a broadcast, and routers do not forward broadcasts. In most real networks the DHCP server sits in a data centre or server VLAN, not on every user subnet. The fix is a **DHCP relay agent**: the router interface that faces the clients listens for DHCP broadcasts, rewrites them as **unicast** to the server, and fills in the **giaddr** (gateway IP address) field with its own interface address. The server uses giaddr to pick the correct scope and sends the reply back to the relay."
    },
    {
     "type": "cli",
     "device": "R2 · IOS-style CLI",
     "lines": [
      "! Clients live on VLAN 30; the DHCP server is 10.0.50.10",
      "R2(config)# interface GigabitEthernet0/1.30",
      "R2(config-subif)#  encapsulation dot1Q 30",
      "R2(config-subif)#  ip address 192.168.30.1 255.255.255.0",
      "R2(config-subif)#  ip helper-address 10.0.50.10",
      "R2(config-subif)# end"
     ],
     "title": "DHCP relay on the client-facing interface",
     "note": "The helper goes on the interface where the client broadcasts arrive — never on the interface facing the server."
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ sudo dhclient -v eth0",
      "DHCPDISCOVER on eth0 to 255.255.255.255 port 67 interval 3",
      "DHCPOFFER of 192.168.30.44 from 192.168.30.1",
      "DHCPREQUEST for 192.168.30.44 on eth0 to 255.255.255.255 port 67",
      "DHCPACK of 192.168.30.44 from 192.168.30.1",
      "bound to 192.168.30.44 -- renewal in 43200 seconds."
     ],
     "title": "Watching DORA from the client",
     "note": "The offer appears to come from 192.168.30.1 — the relay — even though the real server is in another subnet."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A Windows or macOS host showing a **169.254.x.x** address got no DHCP reply and assigned itself a link-local address. Check the access port VLAN, the trunk, the helper address, the server scope and whether the pool is exhausted — in that order, following the packet.",
     "title": "APIPA is a symptom, not an address plan"
    },
    {
     "type": "text",
     "text": "**DNS** is a distributed, hierarchical database. A host asks its configured **resolver** (often a local DNS server) for `portal.branch.example`. If the resolver has no cached answer it performs **recursive resolution**: it asks a **root** server, which refers it to the **TLD** servers for `.example`, which refer it to the **authoritative** servers for `branch.example`, which return the answer. The resolver caches the result for the record's **TTL** and replies to the host."
    },
    {
     "type": "table",
     "head": [
      "Record",
      "Holds",
      "Typical use"
     ],
     "rows": [
      [
       "A",
       "Name → IPv4 address",
       "`www` → 203.0.113.10"
      ],
      [
       "AAAA",
       "Name → IPv6 address",
       "`www` → 2001:db8:10::10"
      ],
      [
       "CNAME",
       "Alias → another name",
       "`intranet` → `portal.branch.example`"
      ],
      [
       "MX",
       "Mail exchanger for a domain, with preference",
       "Where email for the domain is delivered"
      ],
      [
       "PTR",
       "Address → name (reverse lookup)",
       "Log readability, some mail checks"
      ],
      [
       "NS",
       "Authoritative name servers for a zone",
       "Delegation from the parent zone"
      ],
      [
       "TXT",
       "Free text",
       "Domain verification, email policies (SPF, DMARC)"
      ],
      [
       "SOA",
       "Start of authority: zone serial and timers",
       "Zone transfers and caching behaviour"
      ]
     ],
     "title": "DNS record types an associate must recognise"
    },
    {
     "type": "cli",
     "device": "Linux host and R1",
     "lines": [
      "$ dig portal.branch.example A +short",
      "192.168.10.80",
      "$ dig -x 192.168.10.80 +short",
      "portal.branch.example.",
      "! On the router: let it resolve names, or stop it trying",
      "R1(config)# ip name-server 192.168.10.5",
      "R1(config)# no ip domain-lookup"
     ],
     "title": "Testing resolution",
     "note": "`no ip domain-lookup` stops the router treating a mistyped command as a hostname and waiting for DNS. Use it on lab devices; on production devices that must resolve names, configure `ip name-server` instead."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "DHCP: UDP 67 (server) and 68 (client). DNS: UDP 53 for most queries, **TCP 53** for zone transfers and large responses. Firewalls that allow only UDP 53 can break DNS in subtle ways.",
     "title": "Ports to remember"
    },
    {
     "type": "scenario",
     "situation": "A new third-floor VLAN 40 (192.168.40.0/24) was added yesterday. Every PC on the floor shows a 169.254.x.x address. The DHCP server at 10.0.50.10 has a scope for 192.168.40.0/24 with plenty of free addresses. Ports are in VLAN 40 and the trunk to the router allows VLAN 40. What should you check next?",
     "options": [
      {
       "text": "Whether the router subinterface for VLAN 40 has `ip helper-address 10.0.50.10`.",
       "feedback": "Correct. The scope exists and layer 2 is fine, so the broadcast is reaching the router but going no further. A new client subnet needs its own helper address.",
       "best": true
      },
      {
       "text": "Whether the DHCP server's own interface has a helper address.",
       "feedback": "The helper belongs on the interface where client broadcasts arrive. Adding it on the server side does nothing for VLAN 40.",
       "best": false
      },
      {
       "text": "Whether the lease time on the server is too long.",
       "feedback": "Lease time affects how quickly addresses are reused, not whether a brand-new subnet can get any address at all.",
       "best": false
      },
      {
       "text": "Whether DNS has an A record for each PC.",
       "feedback": "DNS records do not hand out addresses. The PCs are failing before they ever have an address to register.",
       "best": false
      }
     ],
     "title": "Helpdesk call: no addresses on the new floor"
    },
    {
     "type": "case",
     "title": "Mirpur clinic: Monday morning, no network",
     "context": "A small clinic in Mirpur, Dhaka, has 35 PCs on VLAN 10 and 12 IP phones on VLAN 20. Over the weekend the ISP replaced the edge router and restored its configuration from an old backup. On Monday, staff PCs obtain addresses but cannot open any website; the phones have 169.254.x.x addresses. The internal DHCP server (10.0.50.10) and DNS server (10.0.50.11) are healthy, and pinging 10.0.50.11 from a PC succeeds.",
     "questions": [
      "Why do the PCs get addresses while the phones do not?",
      "What could stop PCs that can reach the DNS server from opening websites?",
      "Which three show commands would you run first on the new router, and what are you looking for?"
     ],
     "answer": "The phones' VLAN 20 subinterface was probably missing from the old backup or lacks `ip helper-address 10.0.50.10`, so their DHCP broadcasts never reach the server. PCs can reach internal DNS, so local routing works; the Internet failure points to the edge: NAT may be missing or have reversed inside/outside roles, the NAT ACL may not match 192.168.10.0/24 (old addressing), or the default route to the ISP may be wrong. First commands: `show running-config interface` for each subinterface (helper addresses), `show ip nat statistics` (inside/outside roles and hits) with `show ip nat translations`, and `show ip route` (a default route via the new ISP next hop). Lesson: a restored backup must be compared against the current design before go-live."
    },
    {
     "type": "template",
     "title": "DHCP scope plan",
     "purpose": "Plan every scope once, centrally, so exclusions and options are consistent and reviewable.",
     "columns": [
      "VLAN / subnet",
      "Gateway",
      "Excluded range",
      "DNS servers",
      "Lease",
      "Relay (helper) on"
     ],
     "example": [
      [
       "10 Staff — 192.168.10.0/24",
       "192.168.10.1",
       ".1–.20",
       "10.0.50.11, 10.0.50.12",
       "7 days",
       "R1 Gi0/1.10"
      ],
      [
       "20 Voice — 192.168.20.0/24",
       "192.168.20.1",
       ".1–.10",
       "10.0.50.11",
       "1 day",
       "R1 Gi0/1.20"
      ]
     ],
     "rows": 6
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Why is the DHCP Request message sent as a broadcast even though the client already knows the server's address?",
       "options": [
        "Because the client has no MAC address until the Ack arrives",
        "So every server that made an offer learns which one was accepted",
        "Because routers forward broadcasts more reliably than unicasts",
        "Because DHCP uses TCP and needs a broadcast handshake first"
       ],
       "answer": 1,
       "explain": "Broadcasting the Request tells all servers which offer was chosen so the others can release theirs. The client always has a MAC address, routers do not forward broadcasts at all, and DHCP runs over UDP, not TCP."
      },
      {
       "q": "Where must `ip helper-address` be configured?",
       "options": [
        "On the DHCP server's network interface",
        "On every access switch port in the VLAN",
        "On the router interface that faces the Internet service provider",
        "On the router interface that receives the client broadcasts"
       ],
       "answer": 3,
       "explain": "The relay listens on the client-facing interface and converts the broadcast to unicast. Server, access-port and Internet-facing interfaces never see the client broadcast."
      },
      {
       "q": "Which DNS record lets a log server show a hostname instead of 10.0.5.20?",
       "options": [
        "An MX record for the organisation's domain",
        "A CNAME pointing to the address",
        "A PTR record in the reverse zone",
        "An NS record for the host"
       ],
       "answer": 2,
       "explain": "Reverse lookups map addresses to names using PTR records. MX is for mail, a CNAME aliases one name to another name, and NS names authoritative servers."
      },
      {
       "q": "A PC shows 169.254.33.7 /16. What does this most directly tell you?",
       "options": [
        "The PC sent DHCP requests and received no usable reply",
        "The DHCP server assigned it a link-local reservation",
        "The DNS server could not resolve the PC's name",
        "The default gateway rejected the PC's ARP request"
       ],
       "answer": 0,
       "explain": "A 169.254.0.0/16 address is self-assigned when DHCP fails. Servers do not hand out link-local addresses, and DNS or ARP failures do not change how the host is addressed."
      },
      {
       "q": "A resolver has no cached answer for `shop.example`. Which server does it contact first in a full recursive lookup?",
       "options": [
        "The authoritative server for `shop.example` directly",
        "The DHCP server that supplied its settings",
        "A root server, which refers it to the TLD servers",
        "The client's default gateway for the answer"
       ],
       "answer": 2,
       "explain": "Recursive resolution starts at the root, follows referrals to the TLD and then the authoritative server. The resolver does not yet know the authoritative server; DHCP and the gateway play no part in name resolution."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l2",
   "title": "NAT and PAT — Sharing Public Addresses",
   "subtitle": "Translate private addresses at the edge with static NAT, dynamic NAT and overload.",
   "minutes": 30,
   "objectives": [
    "Use the four NAT address terms correctly when reading a translation table.",
    "Configure static NAT, a dynamic NAT pool and PAT on an edge router.",
    "Troubleshoot common NAT faults with show and clear commands."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Branch offices use RFC 1918 private addresses (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) inside, but Internet routers will not route them. **Network Address Translation (NAT)** rewrites the source address of outbound packets at the edge and reverses the change for returning traffic. **Port Address Translation (PAT)**, also called **NAT overload**, also rewrites ports so hundreds of inside hosts can share a single public IPv4 address."
    },
    {
     "type": "table",
     "head": [
      "Term",
      "Meaning",
      "In our example"
     ],
     "rows": [
      [
       "Inside local",
       "Address of the inside host as seen inside",
       "192.168.10.21"
      ],
      [
       "Inside global",
       "Address of the inside host as seen outside (after translation)",
       "203.0.113.1"
      ],
      [
       "Outside local",
       "Address of the outside host as seen from inside",
       "198.51.100.80"
      ],
      [
       "Outside global",
       "Real address of the outside host on the Internet",
       "198.51.100.80"
      ]
     ],
     "title": "The four NAT address names"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "**Inside/outside** says *whose* address it is (our host or the remote one). **Local/global** says *where you are looking from* (inside the edge router or outside it). With ordinary source NAT, outside local and outside global are the same.",
     "title": "Local vs global, inside vs outside"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Leave PC",
       "text": "192.168.10.21:51515 → 198.51.100.80:443"
      },
      {
       "label": "Edge router",
       "text": "Matches ACL 1, creates entry: inside local 192.168.10.21:51515 ↔ inside global 203.0.113.1:51515"
      },
      {
       "label": "On the Internet",
       "text": "203.0.113.1:51515 → 198.51.100.80:443"
      },
      {
       "label": "Reply returns",
       "text": "198.51.100.80:443 → 203.0.113.1:51515"
      },
      {
       "label": "Reverse lookup",
       "text": "Router finds the entry and rewrites destination to 192.168.10.21:51515"
      }
     ],
     "title": "PAT in action — one public address, many hosts"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Static NAT",
       "items": [
        "One inside address ↔ one public address, permanently",
        "Allows inbound connections to servers",
        "Uses one public IP per server"
       ]
      },
      {
       "title": "Dynamic NAT",
       "items": [
        "Inside hosts borrow addresses from a public pool",
        "One public IP per active host",
        "Pool exhaustion blocks new hosts"
       ]
      },
      {
       "title": "PAT (overload)",
       "items": [
        "Many hosts share one address using unique ports",
        "Default choice for branch Internet access",
        "Inbound connections need static or port-forward entries"
       ]
      }
     ],
     "title": "Three ways to translate"
    },
    {
     "type": "cli",
     "device": "EDGE1 · IOS-style CLI",
     "lines": [
      "! ISP gave us 203.0.113.0/29; .1 is our outside interface, .6 the ISP gateway",
      "EDGE1(config)# interface GigabitEthernet0/0",
      "EDGE1(config-if)#  ip address 203.0.113.1 255.255.255.248",
      "EDGE1(config-if)#  ip nat outside",
      "EDGE1(config-if)# interface GigabitEthernet0/1",
      "EDGE1(config-if)#  ip address 192.168.10.1 255.255.255.0",
      "EDGE1(config-if)#  ip nat inside",
      "EDGE1(config-if)# exit",
      "! Static NAT: publish the web server",
      "EDGE1(config)# ip nat inside source static 192.168.10.10 203.0.113.2",
      "! PAT: everyone else shares the interface address",
      "EDGE1(config)# access-list 1 permit 192.168.10.0 0.0.0.255",
      "EDGE1(config)# ip nat inside source list 1 interface GigabitEthernet0/0 overload",
      "EDGE1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.6"
     ],
     "title": "Static NAT plus PAT on a branch edge",
     "note": "Three ingredients every time: mark inside and outside interfaces, define who is translated (the ACL), and define what they become (static address, pool or interface)."
    },
    {
     "type": "cli",
     "device": "EDGE1 · IOS-style CLI",
     "lines": [
      "! Alternative to PAT: a dynamic pool of three public addresses",
      "EDGE1(config)# ip nat pool PUBLIC-POOL 203.0.113.3 203.0.113.5 netmask 255.255.255.248",
      "EDGE1(config)# ip nat inside source list 1 pool PUBLIC-POOL",
      "! Add the keyword overload to the line above to PAT across the pool"
     ],
     "title": "Dynamic NAT with a pool",
     "note": "Without `overload`, the fourth simultaneous inside host gets no translation and its traffic is dropped."
    },
    {
     "type": "cli",
     "device": "EDGE1 · IOS-style CLI",
     "lines": [
      "EDGE1# show ip nat translations",
      "Pro  Inside global        Inside local          Outside local        Outside global",
      "tcp  203.0.113.1:51515    192.168.10.21:51515   198.51.100.80:443    198.51.100.80:443",
      "tcp  203.0.113.1:1024     192.168.10.37:51515   198.51.100.80:443    198.51.100.80:443",
      "---  203.0.113.2          192.168.10.10         ---                  ---",
      "EDGE1# show ip nat statistics",
      "Total active translations: 3 (1 static, 2 dynamic; 2 extended)",
      "Outside interfaces: GigabitEthernet0/0",
      "Inside interfaces: GigabitEthernet0/1",
      "EDGE1# clear ip nat translation *"
     ],
     "title": "Verifying translations",
     "note": "Two PCs used the same source port 51515, so the router kept it for the first and chose another port (1024) for the second. The static entry shows `---` because it exists even when idle. `clear` removes dynamic entries only."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Interfaces marked inside/outside the wrong way round; an ACL that does not match the real inside subnet; a missing default route; or a pool on a subnet the ISP does not route to you. Check the interface roles first — `show ip nat statistics` lists them.",
     "title": "The usual NAT faults"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "PAT blocks unsolicited inbound connections only as a side effect. Use a real stateful firewall policy for protection. With IPv6 there are enough global addresses that translation is normally unnecessary; security comes from firewall policy instead.",
     "title": "NAT is not a firewall — and IPv6 rarely needs it"
    },
    {
     "type": "scenario",
     "situation": "A Dhaka office publishes its booking server 192.168.10.10 as 203.0.113.2 with static NAT. Staff inside browse the Internet fine through PAT. Customers report the server is unreachable. `show ip nat translations` shows the static entry. What is the most likely remaining problem?",
     "options": [
      {
       "text": "Inbound traffic to 203.0.113.2 is not permitted by the edge firewall or ACL policy.",
       "feedback": "Correct. The translation exists, so the next thing on the packet's path is the security policy on the outside interface or upstream firewall.",
       "best": true
      },
      {
       "text": "PAT must be removed because static NAT and PAT cannot coexist.",
       "feedback": "They coexist routinely; static entries take precedence for the specific host.",
       "best": false
      },
      {
       "text": "The inside interface needs `ip nat outside` as well.",
       "feedback": "An interface is either inside or outside. Marking it both ways breaks translation instead of fixing it.",
       "best": false
      },
      {
       "text": "The server needs a public address configured on its own NIC.",
       "feedback": "The whole point of static NAT is that the server keeps its private address.",
       "best": false
      }
     ],
     "title": "A server that nobody outside can reach"
    },
    {
     "type": "template",
     "title": "NAT translation plan",
     "purpose": "Record every published service and shared pool before touching the edge router, so changes are reviewable.",
     "columns": [
      "Service / group",
      "Inside local",
      "Inside global",
      "Type",
      "Ports",
      "Owner / ticket"
     ],
     "example": [
      [
       "Booking web server",
       "192.168.10.10",
       "203.0.113.2",
       "Static",
       "TCP 443",
       "IT-OPS / CHG-1042"
      ],
      [
       "Staff Internet access",
       "192.168.10.0/24",
       "203.0.113.1 (interface)",
       "PAT",
       "All",
       "IT-OPS / CHG-1042"
      ]
     ],
     "rows": 6
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "In `show ip nat translations`, which column holds the private address of your own PC?",
       "options": [
        "Inside global",
        "Inside local",
        "Outside local",
        "Outside global"
       ],
       "answer": 1,
       "explain": "Inside local is the inside host's address as seen inside — its private address. Inside global is the translated public address; the outside columns describe the remote host."
      },
      {
       "q": "A branch has 120 users and one public IPv4 address. Which configuration lets all of them browse at the same time?",
       "options": [
        "One static NAT entry for each of the 120 users",
        "A dynamic pool containing that single address, no overload",
        "Marking the outside interface as `ip nat inside`",
        "An ACL-matched inside source list with `overload`"
       ],
       "answer": 3,
       "explain": "PAT (overload) multiplexes many hosts onto one address using ports. Static entries need one address each, a one-address pool without overload serves one host at a time, and reversed interface roles break NAT."
      },
      {
       "q": "Which command shows which interfaces the router treats as inside and outside?",
       "options": [
        "`show ip nat statistics`",
        "`show ip nat translations`",
        "`show ip interface brief`",
        "`show running-config | include pool`"
       ],
       "answer": 0,
       "explain": "The statistics output lists inside and outside interfaces plus hit counters. The translation table shows entries, `show ip interface brief` shows status only, and the pool filter shows pool definitions."
      },
      {
       "q": "Why does `show ip nat translations` list the static entry even when nobody is using the server?",
       "options": [
        "The server sends keepalives that refresh the entry",
        "Static entries are created by the first inbound packet",
        "Static entries are configured, not created by traffic",
        "The router copies it from the DHCP binding table"
       ],
       "answer": 2,
       "explain": "Static NAT entries exist as soon as they are configured. They are not refreshed by keepalives, not created by traffic and have no relationship with DHCP bindings."
      },
      {
       "q": "PCs on 192.168.20.0/24 cannot reach the Internet, but 192.168.10.0/24 can. NAT uses `access-list 1 permit 192.168.10.0 0.0.0.255`. What is the fix?",
       "options": [
        "Change the outside interface to `ip nat inside`",
        "Configure a second default route for VLAN 20",
        "Enable `ip helper-address` on the VLAN 20 interface",
        "Add a permit for 192.168.20.0 0.0.0.255 to ACL 1"
       ],
       "answer": 3,
       "explain": "Only traffic matched by the NAT ACL is translated, so the new subnet must be added. The interface roles and default route already work for VLAN 10, and a helper address relates to DHCP, not NAT."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l3",
   "title": "NTP, SNMP and Syslog — Time, Health and Evidence",
   "subtitle": "Synchronise clocks, poll and receive device health, and collect logs you can trust.",
   "minutes": 30,
   "objectives": [
    "Explain NTP stratum and configure devices as NTP clients.",
    "Compare SNMPv2c with SNMPv3 and configure a secure SNMPv3 user.",
    "Interpret syslog severity levels and send the right ones to a server."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "When something breaks at 02:14, you will rebuild the story from logs on ten devices. If their clocks disagree by four minutes, the story is fiction. **NTP** makes clocks agree, **SNMP** lets a monitoring system ask devices how they are (and devices shout when something changes), and **syslog** sends a timestamped record of events to a central server. Together they turn a network from a black box into something you can observe."
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "NTP",
       "title": "Time",
       "text": "UDP 123. Clients sync to servers arranged by **stratum**: 0 is a reference clock (GPS, atomic), 1 is a server attached to it, each hop adds one, and 16 means unsynchronised."
      },
      {
       "label": "SNMP",
       "title": "Health",
       "text": "UDP 161 for manager polls (get, set) and UDP 162 for agent notifications (traps and informs). Data is organised in a **MIB** and addressed by **OIDs**."
      },
      {
       "label": "LOG",
       "title": "Events",
       "text": "Syslog, traditionally UDP 514. Each message carries a facility, a **severity 0–7** and text. Central storage survives a device reboot or theft."
      }
     ],
     "title": "The observability trio"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# ntp server 10.0.99.123 prefer",
      "R1(config)# ntp server 10.0.99.124",
      "R1(config)# clock timezone BST 6 0",
      "R1(config)# service timestamps log datetime msec localtime show-timezone",
      "R1(config)# end",
      "R1# show ntp status",
      "Clock is synchronized, stratum 3, reference is 10.0.99.123",
      "R1# show ntp associations",
      "  address         ref clock       st   when   poll reach  delay  offset   disp",
      "*~10.0.99.123     192.0.2.10       2     37     64   377   1.20   0.315   0.92",
      " ~10.0.99.124     192.0.2.11       2     21     64   377   1.45   0.402   1.03"
     ],
     "title": "Router as an NTP client (Bangladesh Standard Time, UTC+6)",
     "note": "The `*` marks the peer currently selected. Reach 377 (octal) means the last eight polls all succeeded. Many teams instead keep every device on UTC to avoid time-zone confusion across regions — pick one standard and apply it everywhere."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Point devices at **at least two** internal NTP servers, and have those servers use several upstream sources. Enable NTP authentication where supported so an attacker cannot shift your clocks and invalidate certificates or logs.",
     "title": "Two sources, authenticated"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "SNMPv2c",
       "items": [
        "Authenticates with a **community string**",
        "Community travels in clear text",
        "No encryption of data",
        "Still common for read-only polling on isolated management networks"
       ]
      },
      {
       "title": "SNMPv3",
       "items": [
        "Named **users** grouped with access rights",
        "Message integrity and authentication (for example SHA)",
        "Optional encryption (for example AES) — `priv` level",
        "The recommended choice for anything new"
       ]
      }
     ],
     "title": "SNMPv2c vs SNMPv3"
    },
    {
     "type": "table",
     "head": [
      "Level",
      "Authentication",
      "Encryption"
     ],
     "rows": [
      [
       "noAuthNoPriv",
       "Username only",
       "No"
      ],
      [
       "authNoPriv",
       "Yes (hash-based)",
       "No"
      ],
      [
       "authPriv",
       "Yes (hash-based)",
       "Yes"
      ]
     ],
     "title": "SNMPv3 security levels"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "! Only the monitoring server may query",
      "R1(config)# ip access-list standard NMS-ONLY",
      "R1(config-std-nacl)#  permit host 10.0.99.50",
      "R1(config-std-nacl)# exit",
      "R1(config)# snmp-server group NMS-GRP v3 priv access NMS-ONLY",
      "R1(config)# snmp-server user nms-poller NMS-GRP v3 auth sha <auth-pass> priv aes 128 <priv-pass>",
      "R1(config)# snmp-server host 10.0.99.50 version 3 priv nms-poller",
      "R1(config)# snmp-server enable traps"
     ],
     "title": "SNMPv3 with authentication and encryption",
     "note": "SNMPv3 users are deliberately not shown in the running configuration. Store the passphrases in your password vault when you create them. `snmp-server enable traps` with no keywords turns on many trap types — in production, enable only the ones your monitoring actually uses."
    },
    {
     "type": "table",
     "head": [
      "Level",
      "Name",
      "Example"
     ],
     "rows": [
      [
       "0",
       "Emergency",
       "System unusable"
      ],
      [
       "1",
       "Alert",
       "Immediate action needed (e.g. temperature critical)"
      ],
      [
       "2",
       "Critical",
       "Critical hardware or software condition"
      ],
      [
       "3",
       "Error",
       "Interface or process error"
      ],
      [
       "4",
       "Warning",
       "Configuration or resource warning"
      ],
      [
       "5",
       "Notification",
       "Normal but significant (e.g. interface up/down, config change)"
      ],
      [
       "6",
       "Informational",
       "Routine events, ACL log hits"
      ],
      [
       "7",
       "Debugging",
       "Output of debug commands"
      ]
     ],
     "title": "Syslog severity levels"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "**E**very **A**lert **C**an **E**scalate **W**hen **N**obody **I**nvestigates **D**aily — Emergency, Alert, Critical, Error, Warning, Notification, Informational, Debugging. Lower number = more severe. Configuring a level sends **that level and everything more severe**.",
     "title": "A memory hook"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# logging host 10.0.99.60",
      "R1(config)# logging trap notifications",
      "R1(config)# logging buffered 32768 informational",
      "R1(config)# logging source-interface Loopback0",
      "R1(config)# end",
      "R1# show logging | include UPDOWN",
      "Oct 19 10:15:32.441 BST: %LINK-3-UPDOWN: Interface GigabitEthernet0/2, changed state to down",
      "Oct 19 10:15:33.442 BST: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/2, changed state to down"
     ],
     "title": "Sending logs to a server",
     "note": "`logging trap notifications` sends levels 0–5 to the server. The message format is FACILITY-SEVERITY-MNEMONIC: `%LINK-3-UPDOWN` is facility LINK at severity 3 (Error)."
    },
    {
     "type": "scenario",
     "situation": "During an outage review, the firewall log shows a WAN link failure at 14:02:10, but the router log shows its interface going down at 14:06:45. Engineers are arguing about which device failed first. What should be fixed so this never happens again?",
     "options": [
      {
       "text": "Configure every device to synchronise with the same internal NTP servers and use one time-zone standard.",
       "feedback": "Correct. Without common time, ordering events across devices is guesswork; NTP plus a consistent time zone (or UTC) gives a single timeline.",
       "best": true
      },
      {
       "text": "Raise the router's logging level to debugging.",
       "feedback": "More messages with the wrong timestamp do not help; debug logging can also overload the CPU.",
       "best": false
      },
      {
       "text": "Switch the firewall to SNMPv3.",
       "feedback": "SNMP security does not change clock accuracy.",
       "best": false
      },
      {
       "text": "Increase the logging buffer on the router.",
       "feedback": "Buffer size controls how many messages are kept, not whether their time is correct.",
       "best": false
      }
     ],
     "title": "Logs that don't line up"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "An NTP client reports stratum 16. What does that mean?",
       "options": [
        "It is directly attached to a GPS reference clock",
        "The device is not synchronised to any valid time source",
        "It is sixteen hops from the best server and still accurate",
        "It is acting as the master clock for the network"
       ],
       "answer": 1,
       "explain": "Stratum 16 is the NTP value for unsynchronised. Stratum 0/1 sit closest to a reference clock, valid strata stop at 15, and a master clock advertises a low stratum."
      },
      {
       "q": "A router has `logging trap warnings`. Which message is sent to the syslog server?",
       "options": [
        "A level 3 error about an interface",
        "A level 5 notification of an interface state change",
        "A level 6 informational ACL hit",
        "A level 7 debug message"
       ],
       "answer": 0,
       "explain": "The configured level sends itself and everything more severe (lower numbers): 0–4. Levels 5, 6 and 7 are less severe and are filtered out."
      },
      {
       "q": "Why is SNMPv3 at the authPriv level preferred over SNMPv2c?",
       "options": [
        "It authenticates users and encrypts the SNMP payload",
        "It switches SNMP to TCP so that polls and replies are never lost",
        "It removes the need for a monitoring server",
        "It sends traps on UDP 161 instead of 162"
       ],
       "answer": 0,
       "explain": "authPriv adds per-user authentication and encryption. SNMP still uses UDP, still needs a manager, and traps still use UDP 162."
      },
      {
       "q": "In `%LINEPROTO-5-UPDOWN`, what does the 5 represent?",
       "options": [
        "The interface slot number 5",
        "Severity level 5, Notification",
        "Facility number 5 in the MIB",
        "Five repeated occurrences of the event"
       ],
       "answer": 1,
       "explain": "The format is FACILITY-SEVERITY-MNEMONIC, so 5 is the severity. It is not a slot, a MIB facility number or a repeat counter."
      },
      {
       "q": "Which port pair is correct for SNMP?",
       "options": [
        "TCP 161 for polling, TCP 162 for traps and informs",
        "UDP 123 for polling, UDP 514 for traps and informs",
        "UDP 161 for polling, UDP 162 for traps and informs",
        "UDP 514 for polling, UDP 161 for traps"
       ],
       "answer": 2,
       "explain": "Managers poll agents on UDP 161 and agents send notifications to UDP 162. UDP 123 is NTP and UDP 514 is syslog; SNMP does not normally use TCP."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l4",
   "title": "Secure Management and File Transfer",
   "subtitle": "Replace Telnet with SSH and move images and configurations safely.",
   "minutes": 25,
   "objectives": [
    "Configure SSH version 2 for remote management and disable Telnet.",
    "Choose between TFTP, FTP, SCP and SFTP for configuration and image transfers.",
    "Follow a safe workflow to back up configurations and stage a software image."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Every device you manage is reached over the network — so the management path is itself an attack surface. **Telnet** (TCP 23) sends the username, password and every command in clear text; anyone who can capture traffic on the path can read them. **SSH** (TCP 22) encrypts the session and authenticates the server with a host key. For a ZCNA engineer the rule is simple: **SSHv2 only, local or AAA accounts, and a management ACL**."
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Name the device",
       "text": "A hostname and domain name are needed to label the RSA key pair."
      },
      {
       "title": "Generate keys",
       "text": "Create an RSA key of at least 2048 bits; this enables the SSH server."
      },
      {
       "title": "Force version 2",
       "text": "SSHv1 has known weaknesses and must not be used."
      },
      {
       "title": "Create an account",
       "text": "Use `secret` (hashed) rather than `password`."
      },
      {
       "title": "Lock down the VTY lines",
       "text": "Authenticate locally (or via AAA), allow SSH only, set an idle timeout and apply a source ACL."
      }
     ],
     "title": "Enabling SSH on an IOS-style device"
    },
    {
     "type": "cli",
     "device": "SW1 · IOS-style CLI",
     "lines": [
      "SW1(config)# hostname SW1",
      "SW1(config)# ip domain-name branch.example",
      "SW1(config)# crypto key generate rsa modulus 2048",
      "SW1(config)# ip ssh version 2",
      "SW1(config)# username netadmin privilege 15 algorithm-type scrypt secret <strong-passphrase>",
      "SW1(config)# line vty 0 15",
      "SW1(config-line)#  login local",
      "SW1(config-line)#  transport input ssh",
      "SW1(config-line)#  exec-timeout 10 0",
      "SW1(config-line)#  access-class MGMT-ONLY in",
      "SW1(config-line)# end",
      "SW1# show ip ssh",
      "SSH Enabled - version 2.0"
     ],
     "title": "SSH for remote management",
     "note": "`transport input ssh` disables Telnet on those lines. The `MGMT-ONLY` standard ACL (built in the Guard module) limits which source addresses may even attempt to log in."
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ ssh netadmin@10.0.99.11",
      "The authenticity of host '10.0.99.11' can't be established.",
      "RSA key fingerprint is SHA256:Qe3f...truncated...",
      "Are you sure you want to continue connecting (yes/no)? yes",
      "netadmin@10.0.99.11's password:",
      "SW1#"
     ],
     "title": "First connection from an admin workstation",
     "note": "The first-connection prompt is your chance to verify the host key fingerprint against your inventory. If it changes later without a planned rebuild, stop and investigate."
    },
    {
     "type": "table",
     "head": [
      "Protocol",
      "Transport",
      "Authentication",
      "Encryption",
      "Use it for"
     ],
     "rows": [
      [
       "TFTP",
       "UDP 69",
       "None",
       "None",
       "Isolated lab or a locked-down management VLAN only"
      ],
      [
       "FTP",
       "TCP 21 (control) and 20 or a passive data port",
       "Username/password in clear text",
       "None",
       "Legacy servers; avoid on untrusted paths"
      ],
      [
       "SCP",
       "TCP 22 (over SSH)",
       "SSH accounts or keys",
       "Yes",
       "Copying images and configs to and from devices"
      ],
      [
       "SFTP",
       "TCP 22 (over SSH)",
       "SSH accounts or keys",
       "Yes",
       "File servers and automation pipelines"
      ],
      [
       "HTTPS",
       "TCP 443",
       "Accounts or tokens",
       "Yes",
       "Downloads from controllers and repositories"
      ]
     ],
     "title": "Moving files to and from devices"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "! Back up the running configuration to a TFTP server in the management VLAN",
      "R1# copy running-config tftp:",
      "Address or name of remote host []? 10.0.99.70",
      "Destination filename [r1-confg]? r1-2026-10-19.cfg",
      "!!",
      "2847 bytes copied in 0.412 secs",
      "! Stage a new image securely with SCP",
      "R1# copy scp://netadmin@10.0.99.70/images/new-image.bin flash:",
      "R1# show flash: | include new-image"
     ],
     "title": "Backups and image staging",
     "note": "Each `!` during a TFTP copy is a successful block. Before booting a new image, compare its hash with the value published by the software provider and confirm there is enough flash for both old and new images."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Keep the previous image on flash until the new one is proven, save the configuration before the change, schedule a maintenance window, and make sure you have **out-of-band console access** — a remote upgrade that fails without console access means a long drive to the site.",
     "title": "Never upgrade without a way back"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "In-band",
       "items": [
        "Management traffic shares the production network",
        "Simple and cheap",
        "If the network breaks, you may lose access exactly when you need it"
       ]
      },
      {
       "title": "Out-of-band",
       "items": [
        "Separate management network or console server",
        "Cellular or separate ISP backup is common",
        "Access survives production outages and misconfigurations"
       ]
      }
     ],
     "title": "In-band vs out-of-band management"
    },
    {
     "type": "scenario",
     "situation": "A junior engineer must copy a new image to 40 branch routers across the WAN. The only server ready is a TFTP server in head office. The WAN crosses an ISP network. What should the team do?",
     "options": [
      {
       "text": "Use SCP or SFTP from an internal server so transfers are authenticated and encrypted, then verify each image hash.",
       "feedback": "Correct. Secure transport plus hash verification protects both confidentiality and integrity of the image.",
       "best": true
      },
      {
       "text": "Use TFTP because it is fastest and needs no accounts.",
       "feedback": "TFTP has no authentication or encryption and is a poor choice across a WAN path you do not control. It also struggles with large files over long, lossy paths.",
       "best": false
      },
      {
       "text": "Use FTP with a strong password.",
       "feedback": "FTP sends the password in clear text, so its strength does not matter once it is captured.",
       "best": false
      },
      {
       "text": "Email the image to each branch manager to load from USB.",
       "feedback": "This adds people, delay and integrity risk to a task that should be controlled and auditable.",
       "best": false
      }
     ],
     "title": "Choosing a transfer method"
    },
    {
     "type": "checklist",
     "title": "Secure management baseline (per device)",
     "items": [
      "SSH version 2 enabled with a 2048-bit (or stronger) key; Telnet disabled on all VTY lines.",
      "Local fallback account uses a hashed `secret`; shared accounts avoided where AAA is available.",
      "VTY lines protected by a management source ACL and an idle timeout.",
      "NTP synchronised to two internal servers; logs timestamped.",
      "Syslog sent to the central server at the agreed level.",
      "SNMPv3 authPriv only; no default or guessable community strings.",
      "Configuration backed up after every change, stored off-device.",
      "Console or out-of-band access tested this quarter."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which command on the VTY lines stops Telnet while still allowing SSH?",
       "options": [
        "`ip ssh version 2`",
        "`login local`",
        "`ip ssh authentication-retries 2`",
        "`transport input ssh`"
       ],
       "answer": 3,
       "explain": "`transport input ssh` limits the protocols accepted on the lines. `ip ssh version 2` selects the SSH version, `login local` chooses where credentials are checked, and `ip ssh authentication-retries` limits failed login attempts."
      },
      {
       "q": "Why must a hostname and domain name be set before generating the RSA key on an IOS-style device?",
       "options": [
        "They are used to name the key pair the SSH server uses",
        "They become the default SSH username and password",
        "They tell the device which DNS server to trust",
        "They are required for TFTP backups to work"
       ],
       "answer": 0,
       "explain": "The key pair is labelled from the host and domain names. They are not credentials, do not configure DNS servers and have nothing to do with TFTP."
      },
      {
       "q": "Which protocol transfers files with no authentication at all?",
       "options": [
        "SFTP",
        "SCP",
        "TFTP",
        "HTTPS"
       ],
       "answer": 2,
       "explain": "TFTP has neither authentication nor encryption. SFTP and SCP run over SSH and HTTPS uses TLS, all of which authenticate."
      },
      {
       "q": "A remote router upgrade fails and the device will not boot the new image. What would have prevented a site visit?",
       "options": [
        "A longer SSH idle timeout",
        "Tested out-of-band console access to the router",
        "A larger logging buffer",
        "An SNMPv2c community string"
       ],
       "answer": 1,
       "explain": "Out-of-band console access works even when the device cannot boot normally. Timeouts, log buffers and SNMP all depend on the device already running."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l5",
   "title": "QoS Basics — Protecting Voice and Video",
   "subtitle": "Why congestion hurts real-time traffic and how classification, marking and queuing help.",
   "minutes": 30,
   "objectives": [
    "Describe bandwidth, delay, jitter and loss and their effect on applications.",
    "Classify and mark traffic using DSCP and 802.1p CoS values.",
    "Explain queuing, policing and shaping, and read a basic QoS policy."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Most of the time a network has spare capacity and every packet is forwarded immediately. **Quality of Service (QoS)** matters in the moments when it does not: a 1 Gbps LAN feeds a 50 Mbps WAN link, everyone joins a video call at 10:00, or a backup starts during business hours. Queues build, and the network must decide **which packets wait and which are dropped**. Without a policy that decision is first-come, first-served — and real-time voice loses."
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "BW",
       "title": "Bandwidth",
       "text": "How much capacity a class of traffic can use on a link."
      },
      {
       "label": "DLY",
       "title": "Delay",
       "text": "Time from sender to receiver. For interactive voice, aim for well under 150 ms one-way."
      },
      {
       "label": "JIT",
       "title": "Jitter",
       "text": "Variation in delay between packets. Voice and video need it low and steady (a common target is under 30 ms)."
      },
      {
       "label": "LOSS",
       "title": "Loss",
       "text": "Packets dropped. TCP recovers by retransmitting; real-time UDP media simply sounds or looks broken."
      }
     ],
     "title": "Four characteristics QoS manages"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Classify",
       "text": "Identify the traffic: by interface, ACL, application or existing marking"
      },
      {
       "label": "Mark",
       "text": "Write a value into the header so later devices need not reclassify"
      },
      {
       "label": "Police / shape",
       "text": "Enforce or smooth a rate at the edge"
      },
      {
       "label": "Queue",
       "text": "Place packets in per-class queues when the link is congested"
      },
      {
       "label": "Schedule / drop",
       "text": "Decide which queue sends next; drop early to avoid collapse"
      }
     ],
     "title": "The QoS toolkit, in the order a packet meets it"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "The point in the network where you start believing markings. Usually the access switch port: you may trust an IP phone's markings, but you re-mark whatever a user PC claims. Anything beyond the boundary uses the marks already set.",
     "title": "Trust boundary"
    },
    {
     "type": "table",
     "head": [
      "Marking",
      "Header",
      "Bits",
      "Values",
      "Scope"
     ],
     "rows": [
      [
       "CoS / PCP",
       "802.1Q VLAN tag (layer 2)",
       "3",
       "0–7",
       "Lost when the frame leaves the trunk or is routed"
      ],
      [
       "DSCP",
       "IP header DS field (layer 3)",
       "6",
       "0–63",
       "Travels end to end with the packet (unless re-marked)"
      ]
     ],
     "title": "Where the marks live"
    },
    {
     "type": "table",
     "head": [
      "Traffic",
      "Per-hop behaviour",
      "DSCP name",
      "Decimal"
     ],
     "rows": [
      [
       "Voice media",
       "Expedited Forwarding",
       "EF",
       "46"
      ],
      [
       "Interactive video",
       "Assured Forwarding class 4, low drop",
       "AF41",
       "34"
      ],
      [
       "Business-critical data",
       "Assured Forwarding class 2, low drop",
       "AF21",
       "18"
      ],
      [
       "Routing and network control",
       "Class Selector 6",
       "CS6",
       "48"
      ],
      [
       "Everything else",
       "Default (best effort)",
       "DF / CS0",
       "0"
      ],
      [
       "Bulk / scavenger",
       "Class Selector 1 (lower than best effort)",
       "CS1",
       "8"
      ]
     ],
     "title": "Common DSCP values"
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "Assured Forwarding",
       "expr": "DSCP = 8 × class + 2 × drop precedence",
       "meaning": "AF31 = 8×3 + 2×1 = 26; AF43 = 8×4 + 2×3 = 38. A higher drop precedence is dropped first inside the same class."
      },
      {
       "name": "Class Selector",
       "expr": "DSCP = 8 × class",
       "meaning": "CS3 = 24, CS6 = 48. These map to the old 3-bit IP precedence values."
      }
     ],
     "title": "Working out DSCP numbers"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Policing",
       "items": [
        "Measures traffic against a rate",
        "Excess is dropped or re-marked immediately",
        "No added delay, but can cause TCP retransmissions",
        "Typical at a provider's ingress or on untrusted traffic"
       ]
      },
      {
       "title": "Shaping",
       "items": [
        "Buffers excess and sends it later",
        "Smooths bursts to match a contracted rate",
        "Adds delay but avoids provider drops",
        "Typical on the customer side of a WAN link"
       ]
      }
     ],
     "title": "Policing vs shaping"
    },
    {
     "type": "keypoints",
     "items": [
      "**FIFO** — one queue, first in first out; no differentiation.",
      "**Priority queue (low-latency queuing)** — a strict-priority queue for voice, always served first but capped by a policer so it cannot starve others.",
      "**Class-based weighted fair queuing** — each class gets a guaranteed share of bandwidth during congestion.",
      "**Congestion avoidance (e.g. WRED)** — drops some lower-priority TCP packets *before* the queue is full so flows slow down gracefully instead of all at once."
     ],
     "title": "Queuing concepts"
    },
    {
     "type": "cli",
     "device": "WAN1 · IOS-style CLI",
     "lines": [
      "WAN1(config)# class-map match-any VOICE",
      "WAN1(config-cmap)#  match dscp ef",
      "WAN1(config-cmap)# class-map match-any VIDEO",
      "WAN1(config-cmap)#  match dscp af41",
      "WAN1(config-cmap)# policy-map WAN-EDGE-OUT",
      "WAN1(config-pmap)#  class VOICE",
      "WAN1(config-pmap-c)#   priority percent 20",
      "WAN1(config-pmap-c)#  class VIDEO",
      "WAN1(config-pmap-c)#   bandwidth percent 30",
      "WAN1(config-pmap-c)#  class class-default",
      "WAN1(config-pmap-c)#   fair-queue",
      "WAN1(config-pmap-c)# interface GigabitEthernet0/0",
      "WAN1(config-if)#  service-policy output WAN-EDGE-OUT",
      "WAN1# show policy-map interface GigabitEthernet0/0 output"
     ],
     "title": "A modular QoS policy on the WAN edge",
     "note": "Three building blocks: **class-map** (what), **policy-map** (what to do), **service-policy** (where and in which direction). Queuing policies act on **output** — the point where congestion actually happens."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "QoS chooses who suffers during congestion; it does not make a link faster. If a link is congested all day, the answer is more capacity or less traffic — QoS just keeps voice and critical apps usable until then.",
     "title": "QoS cannot create bandwidth"
    },
    {
     "type": "scenario",
     "situation": "A Chattogram branch has a 50 Mbps WAN link. Calls break up every afternoon when staff upload scanned documents to head office. Phones mark voice EF, and the access switches trust the phones. The WAN router has no QoS policy. What is the best first step?",
     "options": [
      {
       "text": "Apply an outbound policy on the WAN interface with a priority queue for EF traffic.",
       "feedback": "Correct. Markings already exist; what is missing is a queuing decision where congestion occurs — the WAN egress.",
       "best": true
      },
      {
       "text": "Re-mark all traffic to EF so everything gets priority.",
       "feedback": "If everything is priority, nothing is. The priority queue would be overloaded and voice would still suffer.",
       "best": false
      },
      {
       "text": "Apply the policy inbound on the LAN interface.",
       "feedback": "Congestion happens leaving the slow WAN interface, so queuing must be applied outbound there.",
       "best": false
      },
      {
       "text": "Change phone marking from DSCP to CoS only.",
       "feedback": "CoS is lost once traffic is routed; DSCP is the marking that survives across the WAN.",
       "best": false
      }
     ],
     "title": "Choppy calls at the branch"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "DORA",
       "def": "Discover, Offer, Request, Acknowledge — the four-message DHCP exchange that leases an address to a client."
      },
      {
       "term": "DHCP relay",
       "def": "A router function (`ip helper-address`) that forwards client DHCP broadcasts as unicast to a server in another subnet, adding the giaddr field."
      },
      {
       "term": "TTL (DNS)",
       "def": "How long a resolver may cache a DNS answer before asking again."
      },
      {
       "term": "PAT",
       "def": "Port Address Translation (NAT overload): many inside hosts share one public address, distinguished by port numbers."
      },
      {
       "term": "Inside global",
       "def": "The public address that represents an inside host to the outside world after NAT."
      },
      {
       "term": "Stratum",
       "def": "An NTP server's distance from a reference clock; 16 means unsynchronised."
      },
      {
       "term": "MIB / OID",
       "def": "The structured database of values an SNMP agent exposes, and the numeric identifier of each value."
      },
      {
       "term": "SNMP trap",
       "def": "An unsolicited notification an agent sends to a manager on UDP 162; an inform is the acknowledged version."
      },
      {
       "term": "Syslog severity",
       "def": "A level from 0 (Emergency) to 7 (Debugging) attached to each log message."
      },
      {
       "term": "SCP / SFTP",
       "def": "File transfer protocols that run over SSH, giving authentication and encryption."
      },
      {
       "term": "DSCP",
       "def": "The 6-bit field in the IP header used to mark a packet's QoS class end to end."
      },
      {
       "term": "Trust boundary",
       "def": "The network point where QoS markings start being accepted rather than rewritten."
      },
      {
       "term": "Shaping",
       "def": "Buffering excess traffic to send it later at a target rate, smoothing bursts."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Think of a network you use daily — a campus, office or home. Which IP service (DHCP, DNS, NAT, NTP, logging or QoS) do you think fails or misbehaves most often there, and how would you prove it with one command?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which DSCP value is normally used for voice media?",
       "options": [
        "AF41, decimal 34",
        "CS6, decimal 48",
        "CS1, decimal 8",
        "EF, decimal 46"
       ],
       "answer": 3,
       "explain": "Voice uses Expedited Forwarding (46). AF41 is typical for interactive video, CS6 for network control, and CS1 for scavenger traffic below best effort."
      },
      {
       "q": "What is the decimal DSCP value of AF32?",
       "options": [
        "26",
        "30",
        "34",
        "28"
       ],
       "answer": 3,
       "explain": "AF = 8 × class + 2 × drop precedence = 8×3 + 2×2 = 28. 26 is AF31, 30 is AF33 and 34 is AF41."
      },
      {
       "q": "Why is CoS alone not enough to protect voice across a routed WAN?",
       "options": [
        "CoS is in the 802.1Q tag, which is lost when routed",
        "CoS has more values than DSCP, which confuses routers on the path",
        "CoS is only supported on wireless networks",
        "CoS is applied after queuing, so it is too late"
       ],
       "answer": 0,
       "explain": "The layer 2 tag, and its CoS bits, disappear at the router. CoS has fewer values (0–7) than DSCP, works on wired trunks, and is a marking that queuing reads rather than something applied afterwards."
      },
      {
       "q": "A provider drops all traffic above the contracted 50 Mbps. Which customer-side tool avoids those drops?",
       "options": [
        "Policing inbound traffic to 50 Mbps",
        "Marking all traffic CS1",
        "Shaping outbound traffic to 50 Mbps",
        "Increasing the DHCP lease time"
       ],
       "answer": 2,
       "explain": "Shaping buffers bursts so the provider never sees excess. Policing drops excess itself, marking alone does not limit rate, and DHCP is unrelated."
      },
      {
       "q": "Where should a queuing policy for a congested WAN link be applied?",
       "options": [
        "Inbound on the WAN interface",
        "Outbound on the WAN interface",
        "Inbound on every access port",
        "On the DHCP server's interface"
       ],
       "answer": 1,
       "explain": "Queues form when packets wait to leave a slower interface, so queuing is applied outbound there. Inbound and access-port policies classify or police but cannot schedule the congested link."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m6",
 "order": 6,
 "code": "Air",
 "title": "Wireless Networking",
 "subtitle": "RF fundamentals, 802.11 generations, WLAN architectures, roaming and security — then a real design.",
 "outcomes": [
  "Explain RF behaviour, calculate dBm and SNR, and choose bands and channels sensibly.",
  "Describe 802.11 generations through Wi-Fi 7 and the SSID, BSSID, BSS and ESS building blocks.",
  "Compare autonomous, controller-based and cloud-managed WLANs and explain client roaming.",
  "Select WPA2/WPA3 personal or enterprise security and describe 802.1X roles.",
  "Plan, document and validate a small office WLAN."
 ],
 "lessons": [
  {
   "id": "m6-l1",
   "title": "RF Fundamentals — The Physics Behind Wi-Fi",
   "subtitle": "Frequency, power, channels, interference and signal-to-noise ratio in plain language.",
   "minutes": 30,
   "objectives": [
    "Convert between milliwatts and dBm and apply the 3 dB and 10 dB rules.",
    "Calculate signal-to-noise ratio and judge whether a reading is good enough for the task.",
    "Compare the 2.4, 5 and 6 GHz bands and pick non-overlapping channels."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Up to now the packet has travelled on copper and fibre, where a cable guarantees a private, predictable path. The **Air** stage is different: Wi-Fi shares radio spectrum with every nearby device, signals weaken with distance and walls, and only one transmitter on a channel can talk at a time. A good wireless engineer thinks first about **radio frequency (RF)** behaviour and only then about configuration."
    },
    {
     "type": "keypoints",
     "items": [
      "**Frequency** — how many times per second the wave cycles, in hertz. Wi-Fi uses the 2.4 GHz, 5 GHz and 6 GHz bands.",
      "**Wavelength** — the physical length of one cycle. Higher frequency means shorter wavelength, which generally means less range and poorer wall penetration.",
      "**Amplitude / power** — the strength of the signal, measured in milliwatts (mW) or decibel-milliwatts (dBm).",
      "**Channel** — a defined slice of a band (for example 20, 40, 80, 160 or 320 MHz wide) that a radio uses.",
      "**Half duplex** — on one channel, one radio transmits at a time; Wi-Fi uses **CSMA/CA** (listen, back off, then send) to share the air."
     ],
     "title": "RF vocabulary"
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "dBm",
       "expr": "dBm = 10 × log10(power in mW)",
       "meaning": "1 mW = 0 dBm, 10 mW = 10 dBm, 100 mW = 20 dBm. Received Wi-Fi signals are tiny, so they are negative: −65 dBm is stronger than −80 dBm."
      },
      {
       "name": "Rule of 3s and 10s",
       "expr": "+3 dB ≈ ×2 power; +10 dB = ×10 power",
       "meaning": "Going from −70 to −67 dBm roughly doubles received power; from −70 to −60 dBm is ten times more."
      },
      {
       "name": "SNR",
       "expr": "SNR (dB) = signal (dBm) − noise floor (dBm)",
       "meaning": "Signal −65 dBm with noise −92 dBm gives 27 dB. Higher SNR lets radios use faster modulation."
      },
      {
       "name": "Channel centre",
       "expr": "2.4 GHz: 2407 + 5 × channel MHz; 5 GHz: 5000 + 5 × channel MHz",
       "meaning": "Channel 6 = 2437 MHz; channel 36 = 5180 MHz. Useful when a tool shows frequency instead of channel number."
      }
     ],
     "title": "Power and quality numbers"
    },
    {
     "type": "table",
     "head": [
      "Use",
      "Signal (RSSI)",
      "SNR"
     ],
     "rows": [
      [
       "Basic browsing and email",
       "−70 dBm or better",
       "20 dB or more"
      ],
      [
       "Voice and video calls",
       "−67 dBm or better",
       "25 dB or more"
      ],
      [
       "Dense, high-throughput areas",
       "−65 dBm or better",
       "25–30 dB or more"
      ]
     ],
     "title": "Rule-of-thumb targets"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A strong signal on a busy, noisy channel can perform worse than a weaker signal on a clean one. Always read signal, noise, channel utilisation and retry rates together.",
     "title": "RSSI is not the whole story"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "2.4 GHz",
       "items": [
        "Best range and wall penetration",
        "Only three non-overlapping 20 MHz channels: **1, 6, 11**",
        "Crowded: neighbours, Bluetooth, microwave ovens",
        "Use 20 MHz channels only"
       ]
      },
      {
       "title": "5 GHz",
       "items": [
        "Many more 20 MHz channels (varies by country)",
        "Some channels need **DFS** (radar detection) and may move",
        "Shorter range than 2.4 GHz",
        "40 or 80 MHz channels practical in many offices"
       ]
      },
      {
       "title": "6 GHz",
       "items": [
        "Large clean spectrum where allowed (up to 1200 MHz)",
        "Only Wi-Fi 6E and Wi-Fi 7 clients can use it",
        "WPA3 or Enhanced Open is mandatory",
        "Rules and power levels vary by country"
       ]
      }
     ],
     "title": "The three Wi-Fi bands"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A 2.4 GHz channel is about 20 MHz wide, but channel centres are only 5 MHz apart. Channels 1, 6 and 11 are the set that do not overlap. Using channel 3 next to a neighbour on channel 1 creates **adjacent-channel interference**, which is worse than simply sharing channel 1.",
     "title": "Why 1, 6 and 11?"
    },
    {
     "type": "table",
     "head": [
      "Effect",
      "What happens",
      "Typical cause"
     ],
     "rows": [
      [
       "Free-space path loss",
       "Signal spreads out and weakens with distance",
       "Every link — it is unavoidable"
      ],
      [
       "Absorption",
       "Material soaks up energy",
       "Concrete, brick, water, people, dense foliage"
      ],
      [
       "Reflection",
       "Signal bounces off a surface",
       "Metal shelves, lift shafts, tinted glass"
      ],
      [
       "Multipath",
       "Reflected copies arrive at different times",
       "Warehouses, factories; modern MIMO can exploit it"
      ],
      [
       "Co-channel interference",
       "Radios on the same channel must take turns",
       "Too many APs on one channel"
      ],
      [
       "Non-Wi-Fi interference",
       "Energy that is not Wi-Fi raises the noise floor",
       "Microwave ovens, cordless phones, video senders"
      ]
     ],
     "title": "What weakens or distorts a signal"
    },
    {
     "type": "cli",
     "device": "Linux laptop",
     "lines": [
      "$ iw dev wlan0 link",
      "Connected to 3c:84:6a:11:22:33 (on wlan0)",
      "        SSID: Office-Staff",
      "        freq: 5180",
      "        signal: -61 dBm",
      "        tx bitrate: 433.3 MBit/s VHT-MCS 9 80MHz short GI VHT-NSS 1",
      "$ nmcli -f BSSID,SSID,CHAN,SIGNAL,SECURITY dev wifi list",
      "BSSID              SSID           CHAN  SIGNAL  SECURITY",
      "3C:84:6A:11:22:33  Office-Staff   36    82      WPA3",
      "3C:84:6A:11:22:34  Office-Guest   36    80      OWE",
      "58:D9:C3:44:55:66  Neighbour-Net  6     47      WPA2"
     ],
     "title": "Reading RF from a client",
     "note": "`freq: 5180` is channel 36. `nmcli` shows SIGNAL as a 0–100 quality percentage, not dBm; use `iw` when you need the real value. Notice one AP radio advertises two SSIDs with two BSSIDs."
    },
    {
     "type": "scenario",
     "situation": "Users near an office canteen complain that Wi-Fi becomes unusable around lunchtime. The AP there uses 2.4 GHz channel 6 and 5 GHz channel 44. Most complaining laptops are connected on 2.4 GHz. Signal is −58 dBm. What is the most likely cause and fix?",
     "options": [
      {
       "text": "Microwave ovens raising the 2.4 GHz noise floor; steer capable clients to 5 GHz and reduce reliance on 2.4 GHz.",
       "feedback": "Correct. Microwave ovens leak energy around 2.45 GHz. The signal is strong, so the problem is noise and interference, which 5 GHz avoids.",
       "best": true
      },
      {
       "text": "The AP is too far away; add a second AP on channel 6.",
       "feedback": "−58 dBm is a strong signal. Another AP on the same channel adds co-channel contention rather than fixing interference.",
       "best": false
      },
      {
       "text": "Switch the 2.4 GHz radio to channel 3 to sit between the others.",
       "feedback": "Channel 3 overlaps channels 1 and 6 and creates adjacent-channel interference.",
       "best": false
      },
      {
       "text": "Increase AP transmit power to maximum.",
       "feedback": "More power does not lower the noise floor, and it creates imbalance with low-power phones and laptops.",
       "best": false
      }
     ],
     "title": "Slow Wi-Fi near the canteen"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A client reads −72 dBm signal with a −95 dBm noise floor. What is the SNR?",
       "options": [
        "23 dB",
        "−23 dB",
        "167 dB",
        "72 dB"
       ],
       "answer": 0,
       "explain": "SNR = signal − noise = −72 − (−95) = 23 dB. A negative or summed value comes from subtracting in the wrong order or adding, and 72 ignores the noise floor."
      },
      {
       "q": "Which set of 2.4 GHz channels does not overlap?",
       "options": [
        "1, 5 and 9",
        "1, 6 and 11",
        "2, 7 and 12",
        "1, 3 and 5"
       ],
       "answer": 1,
       "explain": "Only 1, 6 and 11 are spaced far enough apart for 20 MHz channels in a three-channel design. The other sets overlap their neighbours."
      },
      {
       "q": "Transmit power rises from 10 dBm to 20 dBm. How has power in milliwatts changed?",
       "options": [
        "It has doubled, from 10 mW to 20 mW",
        "It has risen by 10 mW, from 10 mW to 20 mW",
        "It is ten times higher, from 10 mW to 100 mW",
        "It is a hundred times higher, from 1 mW to 100 mW"
       ],
       "answer": 2,
       "explain": "+10 dB is a factor of ten, so 10 dBm (10 mW) becomes 20 dBm (100 mW). Doubling would be +3 dB, and 10 dBm is 10 mW, not 1 mW."
      },
      {
       "q": "Why can a laptop that only supports Wi-Fi 6 not see a 6 GHz-only SSID?",
       "options": [
        "The SSID is hidden on 6 GHz by default",
        "Wi-Fi 6 clients support only WPA2, which 6 GHz SSIDs do not offer",
        "6 GHz uses 2.4 GHz channels for discovery",
        "6 GHz operation requires Wi-Fi 6E or newer hardware"
       ],
       "answer": 3,
       "explain": "Wi-Fi 6 (802.11ax) originally covers 2.4 and 5 GHz; the 6 GHz extension is Wi-Fi 6E. SSIDs are not hidden by default, Wi-Fi 6 clients support WPA3, and 6 GHz discovery does not use 2.4 GHz channels."
      },
      {
       "q": "What does DFS mean for a 5 GHz channel?",
       "options": [
        "The channel is reserved for 802.11b clients only",
        "The AP must transmit at double power to overcome radar",
        "The AP must leave the channel if it detects radar",
        "The channel is used only for mesh backhaul links"
       ],
       "answer": 2,
       "explain": "Dynamic Frequency Selection shares some 5 GHz channels with radar, so APs must detect radar and move. It has nothing to do with 802.11b, higher power or mesh-only use."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l2",
   "title": "802.11 Standards and WLAN Building Blocks",
   "subtitle": "From 802.11a/b/g to Wi-Fi 7, and what SSIDs, BSSIDs and service sets really are.",
   "minutes": 25,
   "objectives": [
    "Place each 802.11 amendment in its band and explain the key technology it added.",
    "Distinguish SSID, BSSID, BSS, ESS and the distribution system.",
    "Describe how a client discovers, authenticates and associates to an AP."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "**IEEE 802.11** is the family of standards for wireless LANs; the **Wi-Fi Alliance** certifies products and gives the generations friendly names such as Wi-Fi 6. Every new generation keeps backward compatibility on the bands it shares, but older clients on a channel slow everyone down because they use more airtime to send the same data."
    },
    {
     "type": "table",
     "head": [
      "Amendment",
      "Name",
      "Bands",
      "Key additions",
      "Theoretical max"
     ],
     "rows": [
      [
       "802.11b",
       "Legacy",
       "2.4 GHz",
       "DSSS, up to 11 Mbps",
       "11 Mbps"
      ],
      [
       "802.11a / g",
       "Legacy",
       "5 GHz / 2.4 GHz",
       "OFDM, up to 54 Mbps",
       "54 Mbps"
      ],
      [
       "802.11n",
       "Wi-Fi 4",
       "2.4 and 5 GHz",
       "MIMO, 40 MHz channels, channel bonding",
       "600 Mbps"
      ],
      [
       "802.11ac",
       "Wi-Fi 5",
       "5 GHz",
       "80/160 MHz channels, 256-QAM, downlink MU-MIMO",
       "≈6.9 Gbps"
      ],
      [
       "802.11ax",
       "Wi-Fi 6 / 6E",
       "2.4, 5 (+6 GHz for 6E)",
       "OFDMA, uplink and downlink MU-MIMO, 1024-QAM, BSS colouring, target wake time",
       "≈9.6 Gbps"
      ],
      [
       "802.11be",
       "Wi-Fi 7",
       "2.4, 5 and 6 GHz",
       "320 MHz channels (6 GHz), 4096-QAM, multi-link operation (MLO)",
       "≈46 Gbps"
      ]
     ],
     "title": "802.11 generations at concept level"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "They assume the widest channel, every spatial stream and perfect conditions. A typical phone with two spatial streams in a busy office sees a small fraction. Design for **airtime and capacity**, not headline speed.",
     "title": "Theoretical maximums are marketing numbers"
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "MIMO",
       "title": "Multiple-input multiple-output",
       "text": "Several antennas send parallel **spatial streams**, multiplying throughput for capable clients."
      },
      {
       "label": "MU",
       "title": "Multi-user MIMO",
       "text": "The AP sends to (or receives from) several clients at the same moment using separate spatial streams."
      },
      {
       "label": "OFDMA",
       "title": "Orthogonal frequency-division multiple access",
       "text": "Wi-Fi 6 splits a channel into resource units so several clients share one transmission — great for many small packets."
      },
      {
       "label": "QAM",
       "title": "Modulation density",
       "text": "Higher QAM packs more bits per symbol but needs a cleaner signal (higher SNR)."
      },
      {
       "label": "MLO",
       "title": "Multi-link operation",
       "text": "Wi-Fi 7 lets a device use links on more than one band together for throughput or reliability."
      },
      {
       "label": "TWT",
       "title": "Target wake time",
       "text": "Clients and AP agree when to wake, saving battery for phones and IoT sensors."
      }
     ],
     "title": "Technologies worth knowing"
    },
    {
     "type": "layers",
     "items": [
      {
       "label": "ESS — Extended Service Set",
       "parts": [
        "Several BSSs sharing one SSID",
        "Joined by a wired distribution system",
        "Lets clients roam"
       ]
      },
      {
       "label": "BSS — Basic Service Set",
       "parts": [
        "One AP radio and its associated clients",
        "Identified by a BSSID"
       ]
      },
      {
       "label": "BSSID",
       "parts": [
        "A MAC address for each SSID on each radio",
        "Different on every AP and band"
       ]
      },
      {
       "label": "SSID",
       "parts": [
        "The network name users see",
        "Up to 32 bytes",
        "Same on every AP in an ESS"
       ]
      }
     ],
     "title": "Service set building blocks (largest first)"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "The wired network that connects APs to each other and to the rest of the LAN. In an ESS the DS is usually your switched Ethernet network, with each SSID mapped to a VLAN.",
     "title": "Distribution system (DS)"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Infrastructure mode",
       "items": [
        "Clients talk through an AP",
        "Central security and VLAN mapping",
        "Normal for every business WLAN"
       ]
      },
      {
       "title": "Independent BSS (ad hoc)",
       "items": [
        "Clients talk directly to each other",
        "No AP, no central control",
        "Rare; mostly temporary or device-to-device links"
       ]
      }
     ],
     "title": "Infrastructure vs ad hoc"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Discover",
       "text": "Listen for **beacons** or send **probe requests**; build a list of BSSIDs"
      },
      {
       "label": "Authenticate (802.11)",
       "text": "Open System exchange (or SAE for WPA3-Personal)"
      },
      {
       "label": "Associate",
       "text": "Client requests to join; AP assigns an association ID"
      },
      {
       "label": "Secure",
       "text": "802.1X/EAP if enterprise, then the 4-way handshake derives encryption keys"
      },
      {
       "label": "Get an IP",
       "text": "DHCP over the SSID's VLAN — back to the Serve stage"
      }
     ],
     "title": "How a client joins a WLAN"
    },
    {
     "type": "table",
     "head": [
      "Type",
      "Purpose",
      "Examples"
     ],
     "rows": [
      [
       "Management",
       "Join, leave and advertise networks",
       "Beacon, probe, authentication, association, deauthentication"
      ],
      [
       "Control",
       "Help deliver frames on a shared medium",
       "ACK, RTS, CTS, block ACK"
      ],
      [
       "Data",
       "Carry user traffic",
       "Your encrypted IP packets"
      ]
     ],
     "title": "Three kinds of 802.11 frame"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Each SSID sends its own beacons on every radio, typically about ten per second, at the lowest basic rate. Five SSIDs on one channel can waste a noticeable share of airtime before any user sends data. Aim for three or four SSIDs at most and separate users by policy (VLAN, role) instead.",
     "title": "Fewer SSIDs, more airtime"
    },
    {
     "type": "scenario",
     "situation": "A training centre's 5 GHz radio serves 30 modern laptops and four very old barcode scanners that only support 802.11a. Throughput for everyone drops sharply when the scanners are busy. What is the best long-term fix?",
     "options": [
      {
       "text": "Replace or isolate the legacy scanners, for example on a separate SSID or band with a planned retirement date.",
       "feedback": "Correct. Slow legacy clients consume far more airtime per byte, dragging the whole BSS down. Isolating then retiring them restores capacity.",
       "best": true
      },
      {
       "text": "Increase the channel width to 160 MHz.",
       "feedback": "802.11a clients cannot use wide channels; a 160 MHz channel also raises interference risk without solving the airtime problem.",
       "best": false
      },
      {
       "text": "Hide the SSID so the scanners cannot find it.",
       "feedback": "Hidden SSIDs do not stop clients that are configured for them and add probe traffic.",
       "best": false
      },
      {
       "text": "Add a second SSID for the laptops on the same radio.",
       "feedback": "Another SSID on the same radio adds beacon overhead and does not change who shares the airtime.",
       "best": false
      }
     ],
     "title": "Mixed clients on one AP"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What uniquely identifies a single SSID on a single AP radio?",
       "options": [
        "Its BSSID",
        "Its ESS name",
        "Its channel number",
        "Its VLAN ID"
       ],
       "answer": 0,
       "explain": "Each SSID on each radio has its own BSSID, a MAC address. The ESS shares one SSID across many APs, a channel is shared by many BSSs, and a VLAN is a wired-side mapping."
      },
      {
       "q": "Which Wi-Fi 6 feature lets one transmission carry data for several clients using different resource units?",
       "options": [
        "Channel bonding",
        "OFDMA",
        "Target wake time",
        "DSSS"
       ],
       "answer": 1,
       "explain": "OFDMA divides a channel into resource units for multiple clients. Channel bonding widens a channel, TWT schedules sleep, and DSSS is the old 802.11b modulation."
      },
      {
       "q": "Which frame type does an AP send about ten times per second to advertise each SSID?",
       "options": [
        "ACK, a control frame",
        "RTS, a control frame",
        "Probe response, a data frame",
        "Beacon, a management frame"
       ],
       "answer": 3,
       "explain": "Beacons are management frames advertising the BSS. ACK and RTS are control frames for delivery, and probe responses are management (not data) frames sent only when asked."
      },
      {
       "q": "A user's phone joins the office SSID and then receives an IP address. Which step must happen just before DHCP on a WPA2-Personal network?",
       "options": [
        "An 802.1X exchange with a RADIUS server",
        "A DNS lookup for the AP's name",
        "A spanning-tree convergence on the AP port",
        "The 4-way handshake that derives encryption keys"
       ],
       "answer": 3,
       "explain": "With a pre-shared key the 4-way handshake completes the security setup, then encrypted data such as DHCP can flow. RADIUS is used only in enterprise mode, DNS comes after addressing, and STP is unrelated to client joins."
      },
      {
       "q": "Which statement about Wi-Fi 7 is correct?",
       "options": [
        "It works only in the 6 GHz band and ignores 2.4 and 5 GHz",
        "It can use links on several bands at once (MLO)",
        "It removes the need for WPA3 security",
        "It replaces Ethernet as the distribution system"
       ],
       "answer": 1,
       "explain": "MLO is a headline Wi-Fi 7 feature. Wi-Fi 7 also uses 2.4 and 5 GHz, still relies on WPA3, and still needs a wired distribution system."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l3",
   "title": "AP Modes, WLAN Architectures and Roaming",
   "subtitle": "Autonomous, controller-based and cloud-managed APs — and how clients move between them.",
   "minutes": 30,
   "objectives": [
    "Compare autonomous, controller-based and cloud-managed WLAN architectures.",
    "Match common AP operating modes to their purpose.",
    "Explain client roaming and the role of 802.11k, 802.11v and 802.11r."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A single home router with built-in Wi-Fi is easy to manage. Fifty APs across three buildings are not — channels, power, security and VLANs must stay consistent, and users expect to walk from one end of the site to the other on a video call. The answer is an **architecture** that centralises management and a design that supports **roaming**."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Autonomous",
       "items": [
        "Each AP configured and managed individually",
        "Traffic bridged locally to its own VLANs",
        "Fine for one to three APs",
        "Hard to keep consistent at scale"
       ]
      },
      {
       "title": "Controller-based",
       "items": [
        "Lightweight APs managed by a WLAN controller (appliance, virtual or embedded)",
        "APs tunnel to the controller using **CAPWAP** (control UDP 5246, data UDP 5247)",
        "Central RF management, roaming and policy",
        "Traffic can be tunnelled centrally or switched locally"
       ]
      },
      {
       "title": "Cloud-managed",
       "items": [
        "APs managed from a cloud dashboard",
        "User data stays on the local network; only management goes to the cloud",
        "Fast multi-site rollout and monitoring",
        "Depends on Internet reachability for changes and visibility"
       ]
      }
     ],
     "title": "Three WLAN architectures"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "In controller-based designs, time-critical 802.11 functions (beacons, ACKs, encryption on many platforms) stay on the AP, while management functions (authentication policy, RF management, roaming decisions) live on the controller. The AP and controller split the work.",
     "title": "Split-MAC"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Power and address",
       "text": "AP boots via PoE and gets an IP address by DHCP"
      },
      {
       "label": "Find a controller",
       "text": "Uses DHCP options, DNS or a configured address to discover controllers"
      },
      {
       "label": "Join",
       "text": "Builds an encrypted CAPWAP control tunnel and downloads image and configuration"
      },
      {
       "label": "Serve clients",
       "text": "Starts beaconing SSIDs; client data tunnelled or switched locally per policy"
      }
     ],
     "title": "A lightweight AP comes online"
    },
    {
     "type": "table",
     "head": [
      "Mode",
      "Serves clients?",
      "Purpose"
     ],
     "rows": [
      [
       "Local / client-serving",
       "Yes",
       "Normal operation; scans other channels briefly between client traffic"
      ],
      [
       "Local switching (remote site)",
       "Yes",
       "Controller manages the AP, but client traffic is bridged locally at the branch"
      ],
      [
       "Monitor",
       "No",
       "Full-time scanning for rogues, interference and attacks (wireless IDS)"
      ],
      [
       "Sniffer",
       "No",
       "Captures frames on a channel and forwards them to an analyser"
      ],
      [
       "Bridge / mesh",
       "Yes or backhaul only",
       "Wireless links between APs or buildings where cabling is impossible"
      ],
      [
       "Sensor",
       "No",
       "Behaves like a client to test connectivity, DHCP, DNS and application response"
      ]
     ],
     "title": "Common AP operating modes (generic names)"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Autonomous or local switching",
       "items": [
        "AP bridges each SSID to its own VLAN",
        "Switch port is an **802.1Q trunk**",
        "Native/management VLAN for the AP itself"
       ]
      },
      {
       "title": "Central tunnelling",
       "items": [
        "Client traffic rides inside CAPWAP to the controller",
        "Switch port is usually an **access port** in the AP management VLAN",
        "SSID-to-VLAN mapping happens at the controller"
       ]
      }
     ],
     "title": "How the AP's switch port is configured"
    },
    {
     "type": "cli",
     "device": "SW2 · IOS-style CLI",
     "lines": [
      "! Port for an AP that bridges Staff (VLAN 10) and Guest (VLAN 30) locally",
      "SW2(config)# interface GigabitEthernet1/0/12",
      "SW2(config-if)#  description AP-FLOOR2-EAST",
      "SW2(config-if)#  switchport mode trunk",
      "SW2(config-if)#  switchport trunk native vlan 99",
      "SW2(config-if)#  switchport trunk allowed vlan 10,30,99",
      "SW2(config-if)#  spanning-tree portfast trunk",
      "SW2(config-if)#  power inline auto",
      "SW2# show power inline GigabitEthernet1/0/12"
     ],
     "title": "Access switch port for a locally switching AP",
     "note": "VLAN 99 carries the AP's own management address. Prune the trunk to exactly the VLANs the AP needs; `portfast trunk` avoids waiting for spanning tree when the AP reboots."
    },
    {
     "type": "table",
     "head": [
      "Standard",
      "Name",
      "Max at switch (PSE)",
      "Typical AP fit"
     ],
     "rows": [
      [
       "802.3af",
       "PoE (Type 1)",
       "15.4 W",
       "Older or small single-band APs"
      ],
      [
       "802.3at",
       "PoE+ (Type 2)",
       "30 W",
       "Most Wi-Fi 5 and many Wi-Fi 6 APs"
      ],
      [
       "802.3bt",
       "PoE++ Type 3",
       "60 W",
       "High-end Wi-Fi 6E and Wi-Fi 7 APs"
      ],
      [
       "802.3bt",
       "PoE++ Type 4",
       "90 W",
       "Specialist APs, cameras with heaters, small switches"
      ]
     ],
     "title": "PoE budget for APs (power at the switch port)"
    },
    {
     "type": "text",
     "text": "**Roaming** is decided by the **client**, not the AP. When the current signal drops below the client's threshold, it scans, chooses a better BSSID with the same SSID and reassociates. Good roaming needs about **15–20% cell overlap** at the target signal level (often −67 dBm for voice), consistent security settings, and the same VLAN or a controller that hides the subnet change."
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "11k",
       "title": "802.11k — neighbour reports",
       "text": "The AP tells the client which nearby APs and channels to scan, so it scans less."
      },
      {
       "label": "11v",
       "title": "802.11v — BSS transition",
       "text": "The network can suggest a better AP to a client (for example to balance load or move off a weak AP)."
      },
      {
       "label": "11r",
       "title": "802.11r — fast transition",
       "text": "Keys are pre-derived so the client skips a full 802.1X exchange when it moves — vital for voice on enterprise SSIDs."
      }
     ],
     "title": "Standards that help roaming"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Layer 2 roam",
       "items": [
        "New AP maps the SSID to the same VLAN/subnet",
        "Client keeps its IP address",
        "Simple and common in one building"
       ]
      },
      {
       "title": "Layer 3 roam",
       "items": [
        "New AP's VLAN is a different subnet",
        "Controller anchors or tunnels traffic so the client keeps its IP",
        "Without that help, sessions drop and DHCP restarts"
       ]
      }
     ],
     "title": "Layer 2 vs layer 3 roaming"
    },
    {
     "type": "scenario",
     "situation": "Nurses using Wi-Fi handsets on an enterprise (802.1X) SSID report that calls drop for a few seconds whenever they walk from Ward A to Ward B. Survey data shows −66 dBm at the overlap and both APs map the SSID to the same VLAN. What should you enable first?",
     "options": [
      {
       "text": "802.11r fast transition, with 802.11k neighbour reports, on the voice SSID.",
       "feedback": "Correct. Coverage and VLAN are fine; the gap is the full 802.1X re-authentication on every roam. Fast transition removes most of that delay.",
       "best": true
      },
      {
       "text": "Increase both APs to maximum power.",
       "feedback": "Coverage already meets the voice target. More power often makes clients cling to a distant AP, worsening roams.",
       "best": false
      },
      {
       "text": "Put Ward B's AP on a different VLAN.",
       "feedback": "Changing subnet would make roaming harder, not easier.",
       "best": false
      },
      {
       "text": "Switch the SSID to WPA2-Personal to avoid RADIUS.",
       "feedback": "Downgrading security for a hospital network is unacceptable when a standards-based fix exists.",
       "best": false
      }
     ],
     "title": "Calls drop in the corridor"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which protocol and ports does a lightweight AP use to talk to its controller?",
       "options": [
        "CAPWAP on UDP 5246 for control and UDP 5247 for data",
        "SNMP on UDP 161 for control and UDP 162 for data",
        "SSH on TCP 22 for control and TCP 23 for data",
        "RADIUS on UDP 1812 for control and UDP 1813 for data"
       ],
       "answer": 0,
       "explain": "CAPWAP (an IETF standard) uses UDP 5246 and 5247. SNMP is for monitoring, SSH and Telnet are management sessions, and RADIUS ports are for authentication and accounting."
      },
      {
       "q": "An AP must scan all channels full time for rogue devices and serve no clients. Which mode fits?",
       "options": [
        "Local mode",
        "Bridge mode",
        "Monitor mode",
        "Local switching mode"
       ],
       "answer": 2,
       "explain": "Monitor mode dedicates the radios to scanning. Local and local-switching modes serve clients, and bridge mode builds wireless links between sites or APs."
      },
      {
       "q": "Who makes the final decision to roam to another AP?",
       "options": [
        "The WLAN controller",
        "The client device",
        "The RADIUS server",
        "The access switch"
       ],
       "answer": 1,
       "explain": "Roaming is client-driven; 802.11k and 802.11v let the network give hints, but the client chooses. The controller, RADIUS server and switch cannot force a normal roam."
      },
      {
       "q": "A new Wi-Fi 7 AP powers up but runs with radios disabled on an 802.3af switch. What is the likely issue?",
       "options": [
        "The trunk port to the AP is missing the guest VLAN",
        "The AP has no DNS server configured",
        "The port's PoE budget is too low for the AP",
        "The SSID uses WPA3 instead of WPA2"
       ],
       "answer": 2,
       "explain": "802.3af supplies up to 15.4 W, well below what modern multi-radio APs need, so they boot in a reduced-power state. VLANs, DNS and the security mode do not decide which radios get power."
      },
      {
       "q": "What does a cloud-managed WLAN normally send to the cloud?",
       "options": [
        "All client data traffic for inspection",
        "Only DHCP requests from clients",
        "Every 802.11 beacon frame",
        "Management, configuration and monitoring data"
       ],
       "answer": 3,
       "explain": "Cloud-managed designs keep user traffic local and send management and telemetry to the cloud. They do not haul all user data, DHCP or beacons to the provider."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l4",
   "title": "Wireless Security — WPA2, WPA3 and 802.1X",
   "subtitle": "Protect the air: personal vs enterprise modes, SAE, EAP and guest access.",
   "minutes": 30,
   "objectives": [
    "Explain why WEP and WPA are obsolete and what WPA2 and WPA3 changed.",
    "Contrast personal (passphrase) and enterprise (802.1X) authentication.",
    "Name the three 802.1X roles and choose a suitable EAP method."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "On a cable an attacker needs a port; in the air they need only to be within range — in the car park, in the next building, on the floor above. Wireless security therefore has two jobs: **authenticate** who may join, and **encrypt** every frame so eavesdroppers learn nothing. Modern networks use **WPA2** at minimum and **WPA3** wherever clients support it."
    },
    {
     "type": "table",
     "head": [
      "Generation",
      "Encryption",
      "Status in 2026"
     ],
     "rows": [
      [
       "Open",
       "None",
       "Only acceptable with Enhanced Open (OWE) or for captive-portal guest access with care"
      ],
      [
       "WEP",
       "RC4 with static keys",
       "Broken — must never be used"
      ],
      [
       "WPA",
       "TKIP (RC4-based)",
       "Deprecated — disable it"
      ],
      [
       "WPA2",
       "AES-CCMP",
       "Still widely used; acceptable with a strong passphrase or 802.1X"
      ],
      [
       "WPA3",
       "AES (CCMP or GCMP), SAE, mandatory PMF",
       "Recommended; required on 6 GHz"
      ]
     ],
     "title": "A short history of Wi-Fi security"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Personal (PSK / SAE)",
       "items": [
        "Everyone shares one passphrase",
        "No per-user identity or easy revocation",
        "WPA3-Personal uses **SAE**, which resists offline guessing",
        "Suits homes, small shops, some IoT"
       ]
      },
      {
       "title": "Enterprise (802.1X)",
       "items": [
        "Each user or device has its own credential or certificate",
        "Authentication by a **RADIUS** server",
        "Revoke one user without touching others; assign VLAN or role per user",
        "Standard for organisations"
       ]
      }
     ],
     "title": "Personal vs enterprise"
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "SUP",
       "title": "Supplicant",
       "text": "The client device and its software that presents credentials."
      },
      {
       "label": "AUTH",
       "title": "Authenticator",
       "text": "The AP or WLAN controller (or a switch port on wired networks) that relays EAP and opens the port when told."
      },
      {
       "label": "AS",
       "title": "Authentication server",
       "text": "Usually a RADIUS server that checks credentials against a directory and returns accept or reject, plus policy such as VLAN."
      }
     ],
     "title": "The three 802.1X roles"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Associate",
       "text": "Client associates; the port is open only for EAP"
      },
      {
       "label": "EAP over the air",
       "text": "Supplicant ↔ authenticator using EAP over LAN"
      },
      {
       "label": "RADIUS",
       "text": "Authenticator ↔ RADIUS server (UDP 1812)"
      },
      {
       "label": "Accept",
       "text": "Server sends Access-Accept with key material and policy"
      },
      {
       "label": "4-way handshake",
       "text": "AP and client derive per-session encryption keys; traffic flows"
      }
     ],
     "title": "Enterprise join, step by step"
    },
    {
     "type": "table",
     "head": [
      "Method",
      "Credentials",
      "Notes"
     ],
     "rows": [
      [
       "EAP-TLS",
       "Certificates on both server and client",
       "Strongest common option; needs a certificate authority and device enrolment"
      ],
      [
       "PEAP (with MSCHAPv2 inside)",
       "Server certificate + username/password",
       "Easy to deploy; clients **must** validate the server certificate"
      ],
      [
       "EAP-TTLS",
       "Server certificate + various inner methods",
       "Flexible; common on non-Windows clients"
      ]
     ],
     "title": "EAP methods you will meet"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If clients accept any RADIUS certificate, an attacker can run a fake AP with the same SSID and harvest password hashes. Push a profile that pins the expected certificate authority and server name.",
     "title": "Validate the server certificate"
    },
    {
     "type": "keypoints",
     "items": [
      "**SAE** replaces the PSK exchange in personal mode, so capturing a handshake no longer allows offline dictionary attacks, and past sessions stay safe if the passphrase leaks later (forward secrecy).",
      "**Protected Management Frames (802.11w)** are mandatory, blocking forged deauthentication attacks.",
      "**WPA3-Enterprise 192-bit mode** for high-security environments.",
      "**Enhanced Open (OWE)**: encryption for open guest networks without a password.",
      "**Transition mode** allows WPA2 and WPA3 clients on one SSID during migration — at WPA2's security level for the WPA2 clients."
     ],
     "title": "What WPA3 adds"
    },
    {
     "type": "cli",
     "device": "Linux AP · hostapd.conf",
     "lines": [
      "# Small-office AP: WPA3-Personal only, 5 GHz channel 36",
      "interface=wlan0",
      "ssid=Office-Staff",
      "country_code=BD",
      "ieee80211d=1",
      "hw_mode=a",
      "channel=36",
      "ieee80211n=1",
      "ieee80211ac=1",
      "wpa=2",
      "wpa_key_mgmt=SAE",
      "rsn_pairwise=CCMP",
      "ieee80211w=2",
      "sae_password=<long-random-passphrase>"
     ],
     "title": "WPA3-Personal on an open-source AP daemon",
     "note": "`wpa=2` selects RSN (the WPA2/WPA3 frame format), `wpa_key_mgmt=SAE` makes it WPA3-Personal and `ieee80211w=2` makes management-frame protection mandatory. The country code makes the AP obey local channel and power rules."
    },
    {
     "type": "cli",
     "device": "Linux AP · hostapd.conf",
     "lines": [
      "# Same AP, WPA2-Enterprise using a RADIUS server",
      "wpa=2",
      "wpa_key_mgmt=WPA-EAP",
      "rsn_pairwise=CCMP",
      "ieee8021x=1",
      "auth_server_addr=10.0.99.10",
      "auth_server_port=1812",
      "auth_server_shared_secret=<radius-shared-secret>",
      "ieee80211w=1"
     ],
     "title": "802.1X on the same AP",
     "note": "The AP is the authenticator: it relays EAP to the RADIUS server and never sees the user's password when a TLS-based EAP method is used. `ieee80211w=1` makes PMF optional so older clients can still join."
    },
    {
     "type": "keypoints",
     "items": [
      "**Guest:** separate SSID mapped to a guest VLAN with Internet-only access, client isolation, rate limits, and OWE or a captive portal with acceptable-use terms.",
      "**IoT:** devices that cannot do 802.1X get their own SSID and VLAN, ideally with a unique passphrase per device or group where the platform supports it, and firewall rules limited to what they need.",
      "**Rogue detection:** monitor-mode APs or scanning radios flag unknown APs plugged into your wired network or impersonating your SSID."
     ],
     "title": "Guest and IoT access patterns"
    },
    {
     "type": "scenario",
     "situation": "A 60-person software company uses one WPA2-Personal passphrase that has not changed in three years. Two developers left on bad terms last month. Management wants a fix that will scale. What should you recommend?",
     "options": [
      {
       "text": "Move staff to WPA3-Enterprise (802.1X) with per-user credentials or certificates from the company directory, keep a separate guest SSID.",
       "feedback": "Correct. Per-user identity means leavers are disabled in one place, and the network logs who connected. Guests stay separate.",
       "best": true
      },
      {
       "text": "Change the passphrase every month and email it to staff.",
       "feedback": "Better than nothing, but it still shares one secret, emails it around, and does not remove a leaver until the next change.",
       "best": false
      },
      {
       "text": "Hide the SSID so former staff cannot find it.",
       "feedback": "Hidden SSIDs are still discoverable from client probes; this is not access control.",
       "best": false
      },
      {
       "text": "Filter by MAC address and keep the old passphrase.",
       "feedback": "MAC addresses are trivial to spoof and modern devices randomise them; the leaked passphrase remains valid.",
       "best": false
      }
     ],
     "title": "A Dhaka start-up outgrows its Wi-Fi password"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "In 802.1X on a WLAN, which device is the authenticator?",
       "options": [
        "The AP or WLAN controller",
        "The laptop's Wi-Fi software",
        "The RADIUS server",
        "The DHCP server"
       ],
       "answer": 0,
       "explain": "The authenticator relays EAP between client and server and enforces the result. The laptop is the supplicant, RADIUS is the authentication server, and DHCP takes no part."
      },
      {
       "q": "Which WPA3-Personal feature prevents attackers cracking a captured handshake offline?",
       "options": [
        "Simultaneous Authentication of Equals (SAE)",
        "TKIP per-packet key mixing with a longer passphrase",
        "MAC address filtering",
        "Hiding the SSID in beacons"
       ],
       "answer": 0,
       "explain": "SAE makes each guess require a live exchange with the AP. TKIP belongs to obsolete WPA, and MAC filtering and hidden SSIDs are not cryptographic protections."
      },
      {
       "q": "Which EAP method requires a certificate on every client device?",
       "options": [
        "PEAP with MSCHAPv2",
        "EAP-TLS",
        "EAP-TTLS with PAP",
        "WPA3-Personal SAE"
       ],
       "answer": 1,
       "explain": "EAP-TLS uses mutual certificate authentication. PEAP and TTLS need only a server certificate plus inner credentials, and SAE is a personal-mode handshake, not an EAP method."
      },
      {
       "q": "A 6 GHz SSID will not come up on a new AP configured for WPA2-Personal. Why?",
       "options": [
        "6 GHz only supports 802.1X with EAP-TLS certificates",
        "6 GHz SSIDs cannot use AES encryption",
        "6 GHz requires WPA3 or Enhanced Open security",
        "6 GHz requires the SSID to be hidden"
       ],
       "answer": 2,
       "explain": "Rules for 6 GHz forbid WPA2 and legacy security, requiring WPA3 or OWE with PMF. WPA3-Personal is allowed (not only EAP-TLS), AES is used, and SSIDs need not be hidden."
      },
      {
       "q": "Why is mandatory PMF (802.11w) valuable?",
       "options": [
        "It doubles throughput on crowded channels",
        "It replaces the RADIUS server in enterprise mode",
        "It lets WEP clients join WPA3 networks",
        "It blocks forged deauthentication frames"
       ],
       "answer": 3,
       "explain": "Protected Management Frames authenticate frames such as deauthentication. PMF does not change throughput, does not replace RADIUS and has nothing to do with WEP compatibility."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l5",
   "title": "Designing a Small Office WLAN",
   "subtitle": "A practical walk-through from requirements to validation survey.",
   "minutes": 30,
   "objectives": [
    "Gather WLAN requirements for coverage, capacity, roaming and security.",
    "Produce a simple channel, power and SSID plan for a small site.",
    "Plan and record a validation survey."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Design is where everything in the Air stage comes together. A small office does not need a consultant's 80-page report, but it does need a clear answer to five questions: **who** will use the WLAN, **where**, **with what devices**, **for which applications**, and **how securely**. Answer those first and the AP count, channels and SSIDs almost choose themselves."
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Requirements",
       "text": "Count users and devices (most people carry two or three), list critical applications (voice, video, cloud apps) and note special areas such as meeting rooms or warehouses."
      },
      {
       "title": "Floor plan and walls",
       "text": "Get a scaled plan and mark wall materials. Concrete and metal change everything; plasterboard barely matters."
      },
      {
       "title": "Predictive design",
       "text": "Estimate AP count for both coverage (signal ≥ −67 dBm where voice is needed) and capacity (devices per radio)."
      },
      {
       "title": "Channel and power plan",
       "text": "2.4 GHz: 1/6/11 at 20 MHz, turn some 2.4 GHz radios off if cells overlap too much. 5 GHz: non-adjacent channels, 20–40 MHz in dense areas. Power similar to the weakest client, not maximum."
      },
      {
       "title": "SSID and security plan",
       "text": "Usually Staff (802.1X or WPA3-Personal), Guest (isolated) and possibly IoT; each mapped to its own VLAN."
      },
      {
       "title": "Wired and power",
       "text": "Cable each AP to a switch with enough PoE budget and the correct trunk or access configuration."
      },
      {
       "title": "Install and validate",
       "text": "Mount APs as designed (ceiling, antennas the right way) and run a post-install validation survey."
      }
     ],
     "title": "The ZCNA small-office WLAN walk-through"
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "Devices",
       "expr": "devices = users × devices per user",
       "meaning": "40 users × 2.5 = 100 devices."
      },
      {
       "name": "Active devices",
       "expr": "active = devices × concurrency",
       "meaning": "Not everyone is busy at once; at 60% concurrency, 60 active devices."
      },
      {
       "name": "Radios needed",
       "expr": "radios = active ÷ target per radio",
       "meaning": "With a target of 25 active devices per 5 GHz radio, 60 ÷ 25 = 2.4, so plan 3 APs — then check coverage."
      }
     ],
     "title": "Quick capacity estimate"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A single powerful AP might *cover* a whole floor, but 100 devices sharing its airtime will crawl. Small offices are usually **capacity-bound**: more APs at lower power beat one AP at full power.",
     "title": "Coverage vs capacity"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Predictive",
       "items": [
        "Software model from floor plan and wall types",
        "Before buying hardware",
        "Only as good as the wall data"
       ]
      },
      {
       "title": "Passive",
       "items": [
        "Walk the site listening to beacons",
        "Measures real signal, noise and channel overlap",
        "Used for validation and troubleshooting"
       ]
      },
      {
       "title": "Active",
       "items": [
        "Client associated and passing traffic",
        "Measures throughput, loss, roaming",
        "Proves the network meets application needs"
       ]
      }
     ],
     "title": "Three survey types"
    },
    {
     "type": "table",
     "head": [
      "AP",
      "Location",
      "2.4 GHz",
      "5 GHz",
      "Width (5 GHz)",
      "Power"
     ],
     "rows": [
      [
       "AP1",
       "Reception and meeting room",
       "Ch 1",
       "Ch 36",
       "40 MHz",
       "Medium"
      ],
      [
       "AP2",
       "Open-plan centre",
       "Off (AP1 and AP3 cover 2.4 GHz)",
       "Ch 52",
       "40 MHz",
       "Medium"
      ],
      [
       "AP3",
       "Back offices and store",
       "Ch 11",
       "Ch 149",
       "40 MHz",
       "Medium"
      ]
     ],
     "title": "Example plan: three-AP office (single floor)"
    },
    {
     "type": "cli",
     "device": "SW2 · IOS-style CLI",
     "lines": [
      "SW2# show power inline",
      "Module   Available     Used     Remaining",
      "          (Watts)     (Watts)    (Watts)",
      "------   ---------   --------   ---------",
      "1          370.0       76.5       293.5",
      "Interface  Admin  Oper   Power(W)  Device           Class  Max(W)",
      "Gi1/0/10   auto   on     25.5      AP1-RECEPTION    4      30.0",
      "Gi1/0/11   auto   on     25.5      AP2-OPENPLAN     4      30.0",
      "Gi1/0/12   auto   on     25.5      AP3-BACKOFFICE   4      30.0"
     ],
     "title": "Checking the PoE budget before go-live",
     "note": "Each AP draws its PoE+ class 4 allocation. The switch still has about 293 W spare, so a fourth AP or IP phones will fit. If an AP shows `off` or a low class, check the cable and the AP's power requirement before blaming the radio configuration."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "In a compact office, three 2.4 GHz radios on three APs often hear each other everywhere, creating co-channel contention with no gain. Leaving one radio off is a common, sensible design choice — as long as 2.4-only devices still have coverage.",
     "title": "Turning 2.4 GHz radios off is a feature"
    },
    {
     "type": "case",
     "title": "Sylhet tea-garden office Wi-Fi",
     "context": "A tea estate near Sylhet is replacing a single consumer router in its two-storey brick office (18 staff, 6 laptops shared in the weighing room, CCTV on a separate wired network). The office also needs Wi-Fi in a nearby tin-roofed weighing shed 40 m away, where staff use tablets to record harvest weights. Electricity is unstable, and the Internet comes from one fibre link plus a mobile-data backup. Staff complain of dead spots upstairs and that visitors use the staff password.",
     "questions": [
      "Which architecture would you choose, and why?",
      "How would you cover the weighing shed?",
      "What SSIDs and security would you use?",
      "What power and resilience considerations matter here?"
     ],
     "answer": "A cloud-managed or small controller-based design with three or four ceiling-mounted APs (two per floor, brick walls absorb a lot) gives central management for a site with no on-site engineer; autonomous APs would be harder to keep consistent. For the shed, run outdoor-rated fibre or Ethernet if within 100 m of a switch (40 m is fine for copper, ideally in conduit with surge protection), or use a point-to-point outdoor bridge link if trenching is impossible; the metal roof means the AP must be inside or under the roof, not relying on signal from the office. SSIDs: Staff on WPA3-Personal at minimum (WPA3-Enterprise if they have a directory), a separate Guest SSID on an isolated VLAN with OWE or a rotating passphrase, and change the leaked staff passphrase. Power: a UPS for the PoE switch and router so the WLAN survives short cuts, PoE budget checked for all APs, and the mobile backup tested. Validate with a passive survey upstairs and an active test in the shed with the tablets actually used."
    },
    {
     "type": "template",
     "title": "WLAN survey sheet",
     "purpose": "Record each measurement point during a validation survey so problems can be traced to a location and fixed.",
     "columns": [
      "Point / room",
      "Band / channel",
      "Strongest BSSID",
      "Signal (dBm)",
      "SNR (dB)",
      "Throughput test",
      "Notes"
     ],
     "example": [
      [
       "Upstairs office, desk 4",
       "5 GHz / 36",
       "AP3 5 GHz",
       "−63",
       "29",
       "180 Mbps down",
       "Good; AP1 also heard at −72"
      ],
      [
       "Weighing shed, scale 2",
       "5 GHz / 149",
       "AP-SHED 5 GHz",
       "−70",
       "22",
       "45 Mbps down",
       "Tablet OK; check behind steel racks"
      ]
     ],
     "rows": 8
    },
    {
     "type": "checklist",
     "title": "WLAN go-live checklist",
     "items": [
      "Country code set correctly on every AP or the controller.",
      "Channel and power plan applied; no adjacent-channel use in 2.4 GHz.",
      "No more than three or four SSIDs; each mapped to the intended VLAN.",
      "Staff SSID on WPA3 (or WPA2/WPA3 transition with a migration date); WEP/TKIP disabled.",
      "Guest SSID isolated from internal networks and rate-limited.",
      "802.11k/v/r enabled where clients support them (test old devices first).",
      "PoE budget confirmed; APs running with all radios enabled.",
      "Validation survey completed and saved with the as-built AP map.",
      "Monitoring and rogue detection enabled; admin access secured."
     ]
    },
    {
     "type": "scenario",
     "situation": "A 35-person NGO office (one open floor, 600 m², plasterboard walls) asks you to install a single top-end Wi-Fi 7 AP at maximum power in the centre to save money. Staff make many video calls. What do you advise?",
     "options": [
      {
       "text": "Install two or three APs at moderate power, sized for the number of active devices and video calls.",
       "feedback": "Correct. The space is capacity-bound; several moderate cells give more total airtime and better uplink from phones and laptops.",
       "best": true
      },
      {
       "text": "Accept the single AP at maximum power because Wi-Fi 7 has a 46 Gbps maximum.",
       "feedback": "Theoretical maximums do not change shared airtime; clients far away also cannot transmit back as powerfully as the AP.",
       "best": false
      },
      {
       "text": "Use one AP but set every client to 2.4 GHz for better range.",
       "feedback": "This moves everyone to the most crowded band with only three channels.",
       "best": false
      },
      {
       "text": "Install three APs all on the same 5 GHz channel at maximum power.",
       "feedback": "Same-channel, high-power APs contend with each other, wasting the extra hardware.",
       "best": false
      }
     ],
     "title": "One AP or three?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "dBm",
       "def": "Power relative to 1 milliwatt on a logarithmic scale; 0 dBm = 1 mW, −70 dBm is a typical usable Wi-Fi signal."
      },
      {
       "term": "SNR",
       "def": "Signal-to-noise ratio: received signal minus noise floor, in dB. Higher is better."
      },
      {
       "term": "Co-channel interference",
       "def": "Contention caused by several radios sharing one channel and taking turns to transmit."
      },
      {
       "term": "DFS",
       "def": "Dynamic Frequency Selection: rules that make 5 GHz APs detect radar and vacate some channels."
      },
      {
       "term": "BSSID",
       "def": "The MAC address identifying one SSID on one AP radio."
      },
      {
       "term": "ESS",
       "def": "Extended Service Set: several BSSs with the same SSID joined by a distribution system, enabling roaming."
      },
      {
       "term": "OFDMA",
       "def": "Wi-Fi 6+ technique that splits a channel into resource units shared by several clients in one transmission."
      },
      {
       "term": "MLO",
       "def": "Multi-link operation: Wi-Fi 7 devices using links on several bands at once."
      },
      {
       "term": "CAPWAP",
       "def": "IETF protocol used between lightweight APs and a WLAN controller (UDP 5246 control, 5247 data)."
      },
      {
       "term": "802.11r",
       "def": "Fast BSS transition: pre-derived keys that make roaming between APs quick on secured SSIDs."
      },
      {
       "term": "SAE",
       "def": "Simultaneous Authentication of Equals: WPA3-Personal key exchange that resists offline password guessing."
      },
      {
       "term": "802.1X",
       "def": "Port-based network access control using EAP between supplicant, authenticator and authentication server."
      },
      {
       "term": "PMF",
       "def": "Protected Management Frames (802.11w): authentication of management frames, mandatory in WPA3."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Walk through a building you know well — your campus, office or home. Where would you put access points, which walls would cause the most trouble, and which band would you rely on for each area?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "An office has 50 users with two devices each and expects 50% concurrency. Targeting 25 active devices per radio, how many 5 GHz radios are needed for capacity?",
       "options": [
        "One",
        "Four",
        "Two",
        "Five"
       ],
       "answer": 2,
       "explain": "50 × 2 = 100 devices; 50% active = 50; 50 ÷ 25 = 2 radios. One radio is undersized, while four and five ignore concurrency or the per-radio target."
      },
      {
       "q": "Which survey type proves that real applications achieve the expected throughput after installation?",
       "options": [
        "An active survey",
        "A predictive survey",
        "A passive survey",
        "A spectrum-only survey"
       ],
       "answer": 0,
       "explain": "Active surveys pass real traffic while associated. Predictive surveys model before installation, passive surveys only listen to beacons, and spectrum analysis shows RF energy but not application performance."
      },
      {
       "q": "Why might a designer switch off some 2.4 GHz radios in a compact office?",
       "options": [
        "Because 2.4 GHz cannot carry encrypted traffic",
        "To cut co-channel contention from overlapping cells",
        "Because 2.4 GHz requires 802.3bt power",
        "Because 2.4 GHz radios disable 802.11r roaming for all clients"
       ],
       "answer": 1,
       "explain": "With only three channels, overlapping 2.4 GHz cells mostly add contention. Encryption, PoE class and roaming support are not reasons to disable the band."
      },
      {
       "q": "What transmit power strategy suits a small, dense office?",
       "options": [
        "Maximum power on every AP to create the largest possible cells",
        "Minimum power with one AP per building",
        "Power that changes randomly each hour",
        "Moderate power matched to clients, with more APs"
       ],
       "answer": 3,
       "explain": "Clients transmit at lower power than APs; balanced, moderate cells improve uplink and capacity. Maximum power creates huge overlapping cells, one minimum-power AP leaves gaps, and random changes cause instability."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m7",
 "order": 7,
 "code": "Guard",
 "title": "Security Fundamentals",
 "subtitle": "Threats, AAA, hardening, ACLs, layer 2 protections, VPNs, firewalls and zero trust.",
 "outcomes": [
  "Describe threats, vulnerabilities and social engineering using the CIA triad, and recommend strong authentication.",
  "Configure AAA with local fallback and harden routers and switches against common attacks.",
  "Write, place and verify standard and extended ACLs with correct wildcard masks.",
  "Configure port security, DHCP snooping and dynamic ARP inspection on access switches.",
  "Explain IPsec VPNs, firewall and IPS roles, and the principles of zero trust."
 ],
 "lessons": [
  {
   "id": "m7-l1",
   "title": "Threats, Vulnerabilities and the Human Factor",
   "subtitle": "The vocabulary of security, the CIA triad, social engineering and strong authentication.",
   "minutes": 25,
   "objectives": [
    "Distinguish threat, vulnerability, exploit and risk using network examples.",
    "Map common attacks to the part of the CIA triad they damage.",
    "Recommend a modern password and multi-factor authentication policy."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "The **Guard** stage is where the packet meets security controls. Before configuring any of them, an engineer needs a shared vocabulary — and an honest view that many incidents start not with clever hacking but with a reused password, an unpatched device or a convincing phone call. Network security is technical **and** human."
    },
    {
     "type": "table",
     "head": [
      "Term",
      "Meaning",
      "Network example"
     ],
     "rows": [
      [
       "Asset",
       "Something of value to protect",
       "Core banking server, customer data, the WAN link"
      ],
      [
       "Vulnerability",
       "A weakness that could be used",
       "Router running software with a published flaw; Telnet enabled"
      ],
      [
       "Threat",
       "Someone or something that could cause harm",
       "Criminal group, disgruntled insider, power surge"
      ],
      [
       "Exploit",
       "The method or code that uses a vulnerability",
       "A script that abuses the router flaw to gain access"
      ],
      [
       "Risk",
       "Likelihood × impact of a threat using a vulnerability",
       "High: internet-facing, unpatched, critical service"
      ],
      [
       "Mitigation / control",
       "A measure that reduces risk",
       "Patch, disable Telnet, add an ACL, monitor logs"
      ]
     ],
     "title": "Security vocabulary"
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "C",
       "title": "Confidentiality",
       "text": "Only authorised people can read data. Broken by eavesdropping, stolen credentials, misconfigured access. Protected by encryption and access control."
      },
      {
       "label": "I",
       "title": "Integrity",
       "text": "Data is not altered without detection. Broken by man-in-the-middle tampering or unauthorised config changes. Protected by hashes, signatures, change control."
      },
      {
       "label": "A",
       "title": "Availability",
       "text": "Systems are usable when needed. Broken by DoS attacks, failures, ransomware. Protected by redundancy, capacity, backups, DoS protection."
      }
     ],
     "title": "The CIA triad"
    },
    {
     "type": "table",
     "head": [
      "Attack",
      "How it works",
      "Mainly hits"
     ],
     "rows": [
      [
       "DoS / DDoS",
       "Floods a target with traffic or requests from one or many sources",
       "Availability"
      ],
      [
       "Spoofing",
       "Fakes an IP, MAC or identity to bypass trust",
       "Integrity, confidentiality"
      ],
      [
       "Man-in-the-middle",
       "Attacker sits between two parties (e.g. ARP spoofing, rogue AP)",
       "Confidentiality, integrity"
      ],
      [
       "Reconnaissance",
       "Scans and gathers information before an attack",
       "Prepares later attacks"
      ],
      [
       "Malware / ransomware",
       "Malicious code; ransomware encrypts data for payment",
       "Availability, confidentiality"
      ],
      [
       "Password attacks",
       "Guessing, dictionary, credential stuffing with leaked passwords",
       "Confidentiality"
      ],
      [
       "Layer 2 attacks",
       "MAC flooding, rogue DHCP, ARP poisoning, VLAN hopping",
       "Confidentiality, availability"
      ]
     ],
     "title": "Common attacks and what they damage"
    },
    {
     "type": "keypoints",
     "items": [
      "**Phishing** — mass emails that imitate a bank, courier or IT team to steal credentials.",
      "**Spear phishing / whaling** — tailored messages to a specific person or senior executive.",
      "**Vishing and smishing** — the same trick by voice call or SMS (very common with mobile financial services).",
      "**Pretexting** — a believable story: \"I'm from the ISP, I need your router password to fix the outage.\"",
      "**Tailgating** — following an authorised person through a secure door.",
      "**Baiting** — a USB stick labelled \"Salary 2026\" left in the car park."
     ],
     "title": "Social engineering — attacks on people"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Strong programmes combine **user awareness** (everyone recognises phishing), **training** (staff know procedures), **physical access control** (locked comms rooms, badges) and technical controls. The network team owns part of each.",
     "title": "A security programme, not a single product"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Outdated habits",
       "items": [
        "Short passwords with forced symbols and digits",
        "Mandatory change every 30–90 days",
        "Security questions for recovery",
        "Users write variants like Dhaka@2025, Dhaka@2026"
       ]
      },
      {
       "title": "Current good practice",
       "items": [
        "Long passphrases are the priority",
        "Check new passwords against lists of breached passwords",
        "Change only when compromise is suspected",
        "Allow password managers and paste",
        "Rate-limit and lock out repeated failures"
       ]
      }
     ],
     "title": "Password policy: then and now"
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "KNOW",
       "title": "Something you know",
       "text": "Password, passphrase or PIN."
      },
      {
       "label": "HAVE",
       "title": "Something you have",
       "text": "Authenticator app, hardware security key, smart card, phone."
      },
      {
       "label": "ARE",
       "title": "Something you are",
       "text": "Fingerprint, face or other biometric — usually unlocks a device-held key."
      }
     ],
     "title": "Multi-factor authentication"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "SMS codes are better than nothing but can be intercepted or socially engineered. Push approvals can be abused by spamming prompts until a tired user taps \"approve\". **Phishing-resistant** methods — hardware keys and passkeys bound to the real website — are the strongest choice, especially for network administrators.",
     "title": "Not all MFA is equal"
    },
    {
     "type": "scenario",
     "situation": "A caller says he is from your ISP, mentions your circuit ID correctly and asks the junior engineer on duty to read out the edge router's admin password so he can \"fix packet loss before the CEO notices\". What should the engineer do?",
     "options": [
      {
       "text": "Decline, end the call and contact the ISP through the number in your contract to verify the request.",
       "feedback": "Correct. A known detail like a circuit ID is not proof of identity, and legitimate providers never need your admin password. Verify through a trusted channel.",
       "best": true
      },
      {
       "text": "Give the password because he knows the circuit ID.",
       "feedback": "Circuit IDs appear on invoices and emails; knowing one proves nothing.",
       "best": false
      },
      {
       "text": "Create a temporary admin account for him instead.",
       "feedback": "This still grants access to an unverified stranger.",
       "best": false
      },
      {
       "text": "Ask him to email the request first, then send the password by email.",
       "feedback": "Email is easily spoofed, and sending credentials by email creates another exposure.",
       "best": false
      }
     ],
     "title": "The friendly ISP engineer"
    },
    {
     "type": "reflection",
     "prompt": "Think about the accounts you use for network or lab work. Which ones still rely on a password alone, and what would it take to add phishing-resistant MFA to the most important one?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Telnet is enabled on an Internet-facing router. In security terms, what is the enabled Telnet service?",
       "options": [
        "A vulnerability",
        "A threat",
        "An exploit",
        "A compensating control"
       ],
       "answer": 0,
       "explain": "An enabled clear-text management service is a weakness — a vulnerability. The threat is whoever could use it, the exploit is the method, and a compensating control would be something that reduces the risk, such as disabling it."
      },
      {
       "q": "A DDoS attack makes the online banking portal unreachable. Which part of the CIA triad is primarily affected?",
       "options": [
        "Confidentiality",
        "Integrity",
        "Availability",
        "Non-repudiation"
       ],
       "answer": 2,
       "explain": "DDoS stops legitimate users reaching the service. It does not by itself expose or alter data, and non-repudiation is not one of the three CIA elements."
      },
      {
       "q": "An employee receives an SMS that appears to come from her mobile wallet asking her to confirm a PIN via a link. What is this?",
       "options": [
        "Tailgating",
        "Smishing",
        "Vishing",
        "Whaling"
       ],
       "answer": 1,
       "explain": "Phishing by SMS is smishing. Tailgating is physical, vishing uses voice calls, and whaling targets senior executives."
      },
      {
       "q": "Which password practice reflects current guidance?",
       "options": [
        "Force a password change every 30 days",
        "Require exactly one symbol and one digit",
        "Block password managers from pasting",
        "Screen new passwords against known-breached lists"
       ],
       "answer": 3,
       "explain": "Breached-password screening stops users choosing passwords attackers already have. Forced periodic change and rigid composition rules produce predictable variants, and blocking paste discourages long unique passwords."
      },
      {
       "q": "Which MFA method is most resistant to phishing?",
       "options": [
        "A six-digit code sent by SMS",
        "A push notification that the user taps to approve on a phone",
        "A security question about a first pet",
        "A hardware security key or passkey bound to the site"
       ],
       "answer": 3,
       "explain": "Origin-bound keys will not authenticate to a fake site. SMS codes and push approvals can be relayed or spammed, and security questions are just weak extra passwords."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l2",
   "title": "AAA and Device Hardening",
   "subtitle": "Centralise who can log in and what they can do, then lock down every device.",
   "minutes": 30,
   "objectives": [
    "Explain authentication, authorisation and accounting and why AAA is centralised.",
    "Compare RADIUS and TACACS+ and configure a device to use a AAA server with local fallback.",
    "Apply a device-hardening baseline to routers and switches."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "With five devices, local usernames are manageable. With five hundred, they are a liability: when an engineer leaves, someone must remove their account everywhere, and nobody can prove who changed what. **AAA** moves identity and policy to central servers so every device asks the same question in the same way — and records the answer."
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "AuthN",
       "title": "Authentication",
       "text": "Who are you? Prove it with a password, certificate or MFA."
      },
      {
       "label": "AuthZ",
       "title": "Authorisation",
       "text": "What are you allowed to do? Privilege level, permitted commands, VLAN or role."
      },
      {
       "label": "Acct",
       "title": "Accounting",
       "text": "What did you do and when? Login times, commands entered, session data — evidence for audits and incidents."
      }
     ],
     "title": "AAA — three questions"
    },
    {
     "type": "table",
     "head": [
      "Feature",
      "RADIUS",
      "TACACS+"
     ],
     "rows": [
      [
       "Standard",
       "Open IETF standard",
       "Openly documented protocol (RFC 8907)"
      ],
      [
       "Transport",
       "UDP 1812 (auth) and 1813 (accounting)",
       "TCP 49"
      ],
      [
       "Encryption",
       "Only the password field is hidden",
       "Entire payload encrypted"
      ],
      [
       "AAA separation",
       "Authentication and authorisation combined",
       "Each A handled separately"
      ],
      [
       "Per-command authorisation",
       "Limited",
       "Yes — ideal for device administration"
      ],
      [
       "Typical use",
       "Network access: 802.1X, Wi-Fi, VPN users",
       "Administrator logins to routers, switches, firewalls"
      ]
     ],
     "title": "RADIUS vs TACACS+ (concept level)"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Many organisations run RADIUS for **users joining the network** (Wi-Fi, wired 802.1X, VPN) and TACACS+ for **engineers managing devices**, often on the same policy server platform.",
     "title": "Use both, for different jobs"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# aaa new-model",
      "R1(config)# tacacs server TAC-1",
      "R1(config-server-tacacs)#  address ipv4 10.0.99.11",
      "R1(config-server-tacacs)#  key <shared-secret>",
      "R1(config-server-tacacs)# exit",
      "R1(config)# username breakglass privilege 15 algorithm-type scrypt secret <vaulted-secret>",
      "R1(config)# aaa authentication login default group tacacs+ local",
      "R1(config)# aaa authorization exec default group tacacs+ local",
      "R1(config)# aaa accounting commands 15 default start-stop group tacacs+",
      "R1(config)# line vty 0 15",
      "R1(config-line)#  transport input ssh"
     ],
     "title": "Device administration through TACACS+ with local fallback",
     "note": "`local` after the group means the device uses its local account **only if the server is unreachable** — not if the server rejects the user. Keep the break-glass password in a vault and test it regularly."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Typing `aaa new-model` immediately changes how logins work. On a remote device, keep an existing session open, configure and test a new SSH login in a second window, and only then close the first session.",
     "title": "Lock-out risk"
    },
    {
     "type": "keypoints",
     "items": [
      "Use `enable algorithm-type scrypt secret` and hashed user secrets; `service password-encryption` only hides plain passwords weakly (type 7 is reversible).",
      "Enforce `security passwords min-length` and slow brute force with `login block-for`.",
      "SSHv2 only, management ACL on VTY lines, idle timeouts, login banner.",
      "Disable services you do not use, such as the plain HTTP server; use HTTPS only if web management is needed.",
      "Shut down unused switch ports and place them in an unused, isolated VLAN.",
      "Disable discovery protocols (such as LLDP) on ports facing untrusted networks.",
      "Keep software patched against published vulnerabilities; back up configurations off-device.",
      "Send logs to a central server, synchronise time, and monitor configuration changes."
     ],
     "title": "Device hardening baseline"
    },
    {
     "type": "cli",
     "device": "SW1 · IOS-style CLI",
     "lines": [
      "SW1(config)# enable algorithm-type scrypt secret <strong-secret>",
      "SW1(config)# security passwords min-length 12",
      "SW1(config)# login block-for 120 attempts 5 within 60",
      "SW1(config)# no ip http server",
      "SW1(config)# banner motd ^Authorised access only. Activity is logged.^",
      "SW1(config)# vlan 999",
      "SW1(config-vlan)#  name UNUSED-PARKING",
      "SW1(config-vlan)# interface range GigabitEthernet1/0/20 - 24",
      "SW1(config-if-range)#  switchport mode access",
      "SW1(config-if-range)#  switchport access vlan 999",
      "SW1(config-if-range)#  shutdown"
     ],
     "title": "Hardening commands in practice",
     "note": "`login block-for 120 attempts 5 within 60` blocks new logins for two minutes after five failures within one minute. Banners should warn, not welcome — avoid words like \"Welcome\"."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Management plane",
       "items": [
        "SSH, SNMP, NTP, logging, APIs",
        "Protect with AAA, ACLs, encryption",
        "Compromise = attacker controls the device"
       ]
      },
      {
       "title": "Control plane",
       "items": [
        "Routing protocols, STP, ARP",
        "Protect with authentication and rate limits",
        "Compromise = traffic misdirected"
       ]
      },
      {
       "title": "Data plane",
       "items": [
        "User traffic being forwarded",
        "Protect with ACLs, firewalls, port security",
        "Compromise = data exposed or blocked"
       ]
      }
     ],
     "title": "Management plane, control plane, data plane — protect each"
    },
    {
     "type": "checklist",
     "title": "Router and switch hardening checklist",
     "items": [
      "Hostname, domain, SSHv2 with 2048-bit (or stronger) keys; Telnet off.",
      "AAA to TACACS+ or RADIUS with tested local break-glass account.",
      "Enable secret using a strong hash; minimum password length set.",
      "VTY lines: management ACL, idle timeout, login rate limiting.",
      "Unused services disabled (HTTP, unneeded discovery on edge ports).",
      "Unused ports shut down and in a parking VLAN.",
      "NTP, syslog and SNMPv3 configured to management servers.",
      "Software version checked against current security advisories.",
      "Configuration backed up and compared with the approved baseline.",
      "Login banner with a legal warning in place."
     ]
    },
    {
     "type": "scenario",
     "situation": "A network engineer leaves the company on Friday. The company has 120 switches and routers. Some use local accounts only; others use TACACS+ with local fallback. Which approach removes the leaver's access most reliably and makes the next leaver easy?",
     "options": [
      {
       "text": "Disable the user in the central directory/AAA server now, remove local accounts by automation, and move every device to AAA with a vaulted break-glass account.",
       "feedback": "Correct. Central identity means one change removes access everywhere; a single shared break-glass account in a vault handles AAA outages.",
       "best": true
      },
      {
       "text": "Change the enable secret on every device.",
       "feedback": "The leaver's own username may still work, and changing a shared secret everywhere is slow and disruptive.",
       "best": false
      },
      {
       "text": "Wait for the next quarterly audit to clean up accounts.",
       "feedback": "Leaving access open for months is an obvious and avoidable risk.",
       "best": false
      },
      {
       "text": "Block the leaver's laptop MAC address on the management VLAN.",
       "feedback": "They can use another device; MAC addresses are easy to change.",
       "best": false
      }
     ],
     "title": "Leaver on Friday"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which protocol encrypts the whole payload and supports per-command authorisation for device administrators?",
       "options": [
        "RADIUS over UDP 1812",
        "SNMPv2c over UDP 161",
        "TACACS+ over TCP 49",
        "Syslog over UDP 514"
       ],
       "answer": 2,
       "explain": "TACACS+ encrypts the full body and separates authorisation, enabling per-command control. RADIUS hides only the password and combines authN/authZ, while SNMP and syslog are not AAA protocols."
      },
      {
       "q": "With `aaa authentication login default group tacacs+ local`, when is the local account used?",
       "options": [
        "Only when no TACACS+ server responds",
        "Whenever the TACACS+ server rejects the password",
        "Always before the TACACS+ server is tried",
        "Only for console logins, never for SSH"
       ],
       "answer": 0,
       "explain": "Methods are tried in order and the next method is used only on an error such as no response. A reject is a final answer; local is not tried first; and the default list applies to all lines without their own list."
      },
      {
       "q": "Which accounting record helps most when investigating who changed a router's routing configuration?",
       "options": [
        "Exec accounting of session start times only",
        "Command accounting for privilege level 15",
        "DHCP lease accounting",
        "Interface bandwidth counters"
       ],
       "answer": 1,
       "explain": "Command accounting records each configuration command and who entered it. Session times alone do not show the commands, and DHCP leases or interface counters do not identify administrators."
      },
      {
       "q": "Why is `service password-encryption` not enough to protect passwords in a configuration?",
       "options": [
        "It only works on switches, not routers",
        "It deletes passwords after 30 days",
        "Its type 7 encoding is easily reversed",
        "It sends passwords to the syslog server"
       ],
       "answer": 2,
       "explain": "Type 7 is a weak reversible encoding meant to stop shoulder-surfing. It works on routers and switches alike, does not expire passwords and does not log them."
      },
      {
       "q": "What is the safest way to enable AAA on a remote router?",
       "options": [
        "Keep one session open and test a new login before closing it",
        "Enable AAA and immediately reload the router",
        "Delete the local account first so nobody can bypass the AAA servers",
        "Configure AAA only through a Telnet session"
       ],
       "answer": 0,
       "explain": "A spare open session lets you undo a mistake. Reloading, deleting the fallback account or using Telnet each increase the chance of lock-out or exposure."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l3",
   "title": "Access Control Lists — Filtering Traffic",
   "subtitle": "Standard and extended ACLs, wildcard masks, placement and verification.",
   "minutes": 35,
   "objectives": [
    "Calculate wildcard masks for hosts, subnets and ranges.",
    "Write correct standard and extended ACLs, numbered and named.",
    "Place and apply ACLs in the right direction, and verify them with hit counters."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "An **access control list (ACL)** is an ordered list of permit and deny statements. Routers and switches use ACLs to filter traffic, but also to **identify** traffic for NAT, QoS, VTY access and routing policy. ACL mistakes are among the most common causes of self-inflicted outages, so precision matters."
    },
    {
     "type": "keypoints",
     "items": [
      "Entries are checked **top-down**; the **first match wins** and processing stops.",
      "Every ACL ends with an invisible **implicit deny any** — if nothing matched, the packet is dropped.",
      "An ACL with no permit statements therefore blocks everything.",
      "One ACL per interface, **per direction (in/out), per protocol (IPv4/IPv6)**.",
      "Inbound ACLs check packets as they arrive, before routing; outbound ACLs check packets about to leave."
     ],
     "title": "How every ACL is processed"
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "Rule",
       "expr": "0 bit = must match; 1 bit = ignore",
       "meaning": "A wildcard mask tells the device which address bits to compare."
      },
      {
       "name": "From a subnet mask",
       "expr": "wildcard = 255.255.255.255 − subnet mask",
       "meaning": "/24 → 0.0.0.255; /27 (255.255.255.224) → 0.0.0.31; /20 (255.255.240.0) → 0.0.15.255."
      },
      {
       "name": "Shortcuts",
       "expr": "host A.B.C.D = A.B.C.D 0.0.0.0; any = 0.0.0.0 255.255.255.255",
       "meaning": "Use the keywords for readability."
      }
     ],
     "title": "Wildcard masks"
    },
    {
     "type": "table",
     "head": [
      "Match this",
      "Address",
      "Wildcard"
     ],
     "rows": [
      [
       "Single host 10.1.1.5",
       "10.1.1.5",
       "0.0.0.0 (or `host 10.1.1.5`)"
      ],
      [
       "Subnet 192.168.10.0/24",
       "192.168.10.0",
       "0.0.0.255"
      ],
      [
       "Subnet 172.16.32.0/20",
       "172.16.32.0",
       "0.0.15.255"
      ],
      [
       "Subnet 10.10.4.64/26",
       "10.10.4.64",
       "0.0.0.63"
      ],
      [
       "Point-to-point 203.0.113.4/30",
       "203.0.113.4",
       "0.0.0.3"
      ]
     ],
     "title": "Wildcard practice"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Standard ACL",
       "items": [
        "Matches **source address only**",
        "Numbers 1–99 and 1300–1999, or named",
        "Place **close to the destination** so it does not block the source from other places",
        "Typical use: VTY access, NAT and SNMP source lists"
       ]
      },
      {
       "title": "Extended ACL",
       "items": [
        "Matches protocol, source, destination and ports",
        "Numbers 100–199 and 2000–2699, or named",
        "Place **close to the source** to drop unwanted traffic early",
        "Typical use: traffic policy between subnets"
       ]
      }
     ],
     "title": "Standard vs extended"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "! Only the IT subnet may manage this router",
      "R1(config)# ip access-list standard MGMT-ONLY",
      "R1(config-std-nacl)#  10 permit 10.0.99.0 0.0.0.255",
      "R1(config-std-nacl)#  20 deny any log",
      "R1(config-std-nacl)# line vty 0 15",
      "R1(config-line)#  access-class MGMT-ONLY in",
      "! Numbered equivalent of line 10: access-list 10 permit 10.0.99.0 0.0.0.255"
     ],
     "title": "Standard named ACL protecting management access",
     "note": "On VTY lines the command is `access-class`, not `access-group`. The explicit `deny any log` adds logging for refused attempts; without it the implicit deny still applies silently."
    },
    {
     "type": "cli",
     "device": "R2 · IOS-style CLI",
     "lines": [
      "! Guests (192.168.30.0/24) may use DNS and the web, but never reach internal 10.0.0.0/8",
      "R2(config)# ip access-list extended GUEST-IN",
      "R2(config-ext-nacl)#  5 permit udp any any eq bootps",
      "R2(config-ext-nacl)#  10 permit udp 192.168.30.0 0.0.0.255 host 10.0.50.11 eq domain",
      "R2(config-ext-nacl)#  20 deny   ip 192.168.30.0 0.0.0.255 10.0.0.0 0.255.255.255 log",
      "R2(config-ext-nacl)#  30 permit tcp 192.168.30.0 0.0.0.255 any eq 80",
      "R2(config-ext-nacl)#  40 permit tcp 192.168.30.0 0.0.0.255 any eq 443",
      "R2(config-ext-nacl)#  50 permit udp 192.168.30.0 0.0.0.255 any eq 443",
      "R2(config-ext-nacl)#  60 deny   ip any any log",
      "R2(config-ext-nacl)# interface GigabitEthernet0/1.30",
      "R2(config-subif)#  ip access-group GUEST-IN in"
     ],
     "title": "Extended named ACL on the guest VLAN, close to the source",
     "note": "Order matters: the DNS permit (line 10) must come **before** the deny to 10.0.0.0/8 (line 20), or guests could never resolve names. UDP 443 allows QUIC-based web traffic. Line 5 matters too: DHCP Discovers arrive from source 0.0.0.0 and renewals go to the DHCP server in 10.0.0.0/8, so without an early bootps permit an inbound ACL silently breaks DHCP."
    },
    {
     "type": "cli",
     "device": "R2 · IOS-style CLI",
     "lines": [
      "R2# show access-lists GUEST-IN",
      "Extended IP access list GUEST-IN",
      "    5 permit udp any any eq bootps (962 matches)",
      "    10 permit udp 192.168.30.0 0.0.0.255 host 10.0.50.11 eq domain (4127 matches)",
      "    20 deny ip 192.168.30.0 0.0.0.255 10.0.0.0 0.255.255.255 log (12 matches)",
      "    30 permit tcp 192.168.30.0 0.0.0.255 any eq www (8830 matches)",
      "    40 permit tcp 192.168.30.0 0.0.0.255 any eq 443 (51204 matches)",
      "    50 permit udp 192.168.30.0 0.0.0.255 any eq 443 (9921 matches)",
      "    60 deny ip any any log (37 matches)",
      "R2# configure terminal",
      "R2(config)# ip access-list extended GUEST-IN",
      "R2(config-ext-nacl)#  15 permit icmp 192.168.30.0 0.0.0.255 host 192.168.30.1 echo",
      "R2(config-ext-nacl)#  no 60"
     ],
     "title": "Verifying and editing with sequence numbers",
     "note": "Hit counters prove which line is matching. Named ACLs let you insert a line (15) between existing ones or delete a single line (`no 60`) without rewriting the list. Removing line 60 leaves the implicit deny in place, just without logging."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Stand on the router and look at the interface. **In** = traffic arriving from that subnet; **out** = traffic leaving towards it. An ACL written with the subnet as the *source* belongs **inbound** on the subnet's interface.",
     "title": "Direction is the most common mistake"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "State the policy in words",
       "text": "\"Tellers may reach core banking on TCP 443 and DNS; nothing else.\""
      },
      {
       "title": "Identify the source and destination",
       "text": "Subnets, hosts, protocols and ports."
      },
      {
       "title": "Choose type and placement",
       "text": "Extended close to source; standard close to destination."
      },
      {
       "title": "Write specific lines first",
       "text": "Permits and denies for exceptions before broader rules."
      },
      {
       "title": "Decide on the final line",
       "text": "Explicit `deny ip any any log` for visibility, or rely on the implicit deny."
      },
      {
       "title": "Apply in a change window and verify",
       "text": "Test allowed and blocked flows; watch hit counters; keep a rollback ready."
      }
     ],
     "title": "ZCNA ACL method"
    },
    {
     "type": "case",
     "title": "Motijheel bank branch: the 09:00 lockout",
     "context": "A bank branch in Motijheel, Dhaka, has a teller VLAN 192.168.50.0/24 on router subinterface Gi0/1.50. Policy says tellers may only reach the core banking servers in 10.20.0.0/24 on TCP 443 and the DNS server 10.20.1.53. On Thursday night an engineer added:\n`ip access-list extended TELLER-POLICY`\n` 10 permit tcp 192.168.50.0 0.0.0.255 10.20.0.0 0.0.0.255 eq 443`\n`interface Gi0/1.50`\n` ip access-group TELLER-POLICY out`\nAt 09:00 on Sunday no teller can open the banking application, and queues form in the banking hall. The ACL shows zero matches.",
     "questions": [
      "Why does the ACL show zero matches and block everything?",
      "What is missing from the policy itself?",
      "Write the corrected configuration.",
      "What process failures allowed this to reach a working day?"
     ],
     "answer": "Applied **out** on Gi0/1.50, the ACL checks traffic leaving the router towards the tellers — replies whose source is 10.20.x.x. No line matches source 192.168.50.0/24 in that direction, so the implicit deny drops every reply (zero matches on line 10). It belongs **inbound** on Gi0/1.50, close to the source. The policy also forgot DNS: the application is opened by name, so even correctly applied the ACL would break it. Corrected:\n`ip access-list extended TELLER-POLICY`\n` 5 permit udp any any eq bootps`\n` 10 permit udp 192.168.50.0 0.0.0.255 host 10.20.1.53 eq domain`\n` 20 permit tcp 192.168.50.0 0.0.0.255 host 10.20.1.53 eq domain`\n` 30 permit tcp 192.168.50.0 0.0.0.255 10.20.0.0 0.0.0.255 eq 443`\n` 40 deny ip any any log`\n`interface Gi0/1.50`\n` no ip access-group TELLER-POLICY out`\n` ip access-group TELLER-POLICY in`\nLine 5 keeps teller DHCP working through the relay once the ACL is inbound. Process failures: no test of allowed flows after the change, no peer review of direction and DNS, no monitoring of hit counters, and no rollback plan or post-change check before the branch opened."
    },
    {
     "type": "template",
     "title": "ACL planner",
     "purpose": "Write every ACL as policy first, then as lines. Reviewers can check intent, order and placement before it touches a live interface.",
     "columns": [
      "Seq",
      "Action",
      "Protocol",
      "Source",
      "Destination",
      "Port",
      "Reason / ticket"
     ],
     "example": [
      [
       "10",
       "permit",
       "udp",
       "192.168.50.0 0.0.0.255",
       "host 10.20.1.53",
       "eq 53",
       "Teller DNS — CHG-2210"
      ],
      [
       "30",
       "permit",
       "tcp",
       "192.168.50.0 0.0.0.255",
       "10.20.0.0 0.0.0.255",
       "eq 443",
       "Core banking HTTPS — CHG-2210"
      ]
     ],
     "rows": 8
    },
    {
     "type": "scenario",
     "situation": "Users in 10.1.10.0/24 (behind R1) must not reach the HR server 10.3.3.10 (behind R3) on any protocol, but must still reach everything else, including other servers behind R3. You will use one extended ACL. Where is the best place to apply it?",
     "options": [
      {
       "text": "Inbound on R1's interface facing 10.1.10.0/24.",
       "feedback": "Correct. An extended ACL can match both source and destination exactly, so placing it close to the source stops the traffic before it crosses the WAN.",
       "best": true
      },
      {
       "text": "Outbound on R3's interface facing the HR server.",
       "feedback": "It would work, but unwanted traffic would cross the whole network first. Extended ACLs belong near the source.",
       "best": false
      },
      {
       "text": "Inbound on R3's WAN interface as a standard ACL denying 10.1.10.0/24.",
       "feedback": "A standard ACL matches source only, so it would block those users from everything behind R3, not just HR.",
       "best": false
      },
      {
       "text": "On the VTY lines of R1.",
       "feedback": "VTY ACLs control management sessions to the router, not traffic passing through it.",
       "best": false
      }
     ],
     "title": "Where should it go?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What wildcard mask matches every host in 172.20.16.0/21?",
       "options": [
        "0.0.15.255",
        "0.0.7.255",
        "255.255.248.0",
        "0.0.3.255"
       ],
       "answer": 1,
       "explain": "A /21 mask is 255.255.248.0, and 255.255.255.255 − 255.255.248.0 = 0.0.7.255. 0.0.15.255 is a /20, 255.255.248.0 is the subnet mask itself, and 0.0.3.255 is a /22."
      },
      {
       "q": "An ACL contains only `deny tcp any host 10.0.5.5 eq 23` and is applied inbound. What happens to all other traffic on that interface?",
       "options": [
        "It is permitted because nothing denies it",
        "It is permitted only if it is UDP",
        "It is logged and then forwarded",
        "It is dropped by the implicit deny"
       ],
       "answer": 3,
       "explain": "Every ACL ends with an implicit deny any, so a deny-only ACL blocks everything. Nothing is permitted by default, protocol type does not matter, and there is no automatic logging."
      },
      {
       "q": "Which command applies a named ACL to restrict SSH access to the router itself?",
       "options": [
        "`ip access-group MGMT-ONLY in` under the VTY lines",
        "`ip access-group MGMT-ONLY out` on the LAN interface",
        "`access-list MGMT-ONLY permit ssh` in global mode",
        "`access-class MGMT-ONLY in` under the VTY lines"
       ],
       "answer": 3,
       "explain": "VTY lines use `access-class`. `ip access-group` applies ACLs to interfaces, an outbound LAN ACL would filter transit traffic, and the last command is not valid syntax."
      },
      {
       "q": "Where should a standard ACL normally be placed?",
       "options": [
        "Close to the destination",
        "Close to the source",
        "On every interface in both directions",
        "Only on the Internet-facing interface"
       ],
       "answer": 0,
       "explain": "Because a standard ACL matches only the source, placing it near the source would block that source from every destination. Extended ACLs go near the source; applying everywhere or only at the edge ignores the policy."
      },
      {
       "q": "Line 30 of a named ACL shows 0 matches while users complain the traffic it permits is blocked. Lines 10 and 20 have many matches. What should you suspect first?",
       "options": [
        "The router has run out of memory for ACLs",
        "Line 30 needs to be moved to the end",
        "An earlier line matches that traffic first",
        "Hit counters only update after a reload"
       ],
       "answer": 2,
       "explain": "First match wins, so a broader deny above line 30 is the usual cause. Memory exhaustion is unlikely, moving a permit lower makes things worse, and counters update in real time."
      },
      {
       "q": "Which extended ACL line lets hosts in 10.5.0.0/16 reach web server 10.9.9.9 over HTTPS?",
       "options": [
        "`permit udp 10.5.0.0 0.0.255.255 host 10.9.9.9 eq 443 tcp`",
        "`permit tcp 10.5.0.0 0.0.255.255 host 10.9.9.9 eq 443`",
        "`permit tcp host 10.9.9.9 10.5.0.0 0.0.255.255 eq 443`",
        "`permit tcp 10.5.0.0 255.255.0.0 host 10.9.9.9 eq 443`"
       ],
       "answer": 1,
       "explain": "The correct line uses TCP, source subnet with wildcard 0.0.255.255, then the destination host and port. The others mix protocols, reverse source and destination, or use a subnet mask instead of a wildcard."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l4",
   "title": "Layer 2 Security — Port Security, DHCP Snooping and DAI",
   "subtitle": "Stop the attacks that start on an access port.",
   "minutes": 30,
   "objectives": [
    "Configure port security with sticky MACs and choose a violation mode.",
    "Explain how DHCP snooping blocks rogue servers and builds a binding table.",
    "Configure dynamic ARP inspection and explain its dependency on DHCP snooping."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Most routers and firewalls sit at layer 3, but an attacker who plugs into an office wall port lands on layer 2 — inside the VLAN, beside the victims. Several classic attacks live here: flooding the MAC table, running a rogue DHCP server, and poisoning ARP caches to intercept traffic. Access switches have built-in features to stop each of them."
    },
    {
     "type": "table",
     "head": [
      "Attack",
      "What it does",
      "Switch feature"
     ],
     "rows": [
      [
       "MAC flooding",
       "Fills the MAC table so the switch floods frames to every port, exposing traffic",
       "Port security (MAC limits)"
      ],
      [
       "Rogue DHCP server",
       "Hands out a fake gateway or DNS to redirect traffic",
       "DHCP snooping"
      ],
      [
       "DHCP starvation",
       "Requests every address so real clients get none",
       "DHCP snooping rate limit, port security"
      ],
      [
       "ARP spoofing / poisoning",
       "Claims to be the gateway's IP so traffic flows through the attacker",
       "Dynamic ARP inspection (DAI)"
      ],
      [
       "IP spoofing on the LAN",
       "Uses another host's IP address",
       "IP source guard (uses the snooping table)"
      ],
      [
       "VLAN hopping",
       "Negotiates a trunk or double-tags frames to reach other VLANs",
       "Static access ports, DTP disabled, unused native VLAN"
      ]
     ],
     "title": "Layer 2 attacks and their counters"
    },
    {
     "type": "cli",
     "device": "SW1 · IOS-style CLI",
     "lines": [
      "SW1(config)# interface GigabitEthernet0/5",
      "SW1(config-if)#  switchport mode access",
      "SW1(config-if)#  switchport access vlan 20",
      "SW1(config-if)#  switchport port-security",
      "SW1(config-if)#  switchport port-security maximum 2",
      "SW1(config-if)#  switchport port-security mac-address sticky",
      "SW1(config-if)#  switchport port-security violation restrict",
      "SW1(config-if)# end",
      "SW1# show port-security interface GigabitEthernet0/5",
      "Port Security              : Enabled",
      "Port Status                : Secure-up",
      "Violation Mode             : Restrict",
      "Maximum MAC Addresses      : 2",
      "Total MAC Addresses        : 2",
      "Sticky MAC Addresses       : 2",
      "Security Violation Count   : 0"
     ],
     "title": "Port security for a desk with a phone and a PC",
     "note": "Port security works only on a port statically set to access (or trunk) mode — not on a dynamically negotiating port. A maximum of 2 allows an IP phone plus the PC behind it. Sticky addresses are learned dynamically and written into the running configuration; save it to keep them after a reload."
    },
    {
     "type": "table",
     "head": [
      "Mode",
      "Drops offending frames",
      "Logs / counts",
      "Port state"
     ],
     "rows": [
      [
       "Protect",
       "Yes",
       "No",
       "Stays up"
      ],
      [
       "Restrict",
       "Yes",
       "Yes (syslog, SNMP, counter)",
       "Stays up"
      ],
      [
       "Shutdown (default)",
       "Yes",
       "Yes",
       "Error-disabled until recovered"
      ]
     ],
     "title": "Violation modes"
    },
    {
     "type": "cli",
     "device": "SW1 · IOS-style CLI",
     "lines": [
      "SW1# show interfaces status err-disabled",
      "Port      Name        Status         Reason",
      "Gi0/7     Desk-17     err-disabled   psecure-violation",
      "! After removing the unauthorised device:",
      "SW1(config)# interface GigabitEthernet0/7",
      "SW1(config-if)#  shutdown",
      "SW1(config-if)#  no shutdown",
      "! Or recover automatically after 5 minutes:",
      "SW1(config)# errdisable recovery cause psecure-violation",
      "SW1(config)# errdisable recovery interval 300"
     ],
     "title": "Recovering an error-disabled port",
     "note": "Find out *why* the violation happened before re-enabling. Automatic recovery is convenient but brings a port back even if the rogue device is still attached."
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Untrusted port",
       "text": "User ports are untrusted by default once snooping is on"
      },
      {
       "label": "Client messages pass",
       "text": "Discover and Request from clients are allowed (rate-limited)"
      },
      {
       "label": "Server messages blocked",
       "text": "Offer and Ack arriving on an untrusted port are dropped — a rogue server is silenced"
      },
      {
       "label": "Trusted uplink",
       "text": "Real server replies arrive on the trusted uplink and are forwarded"
      },
      {
       "label": "Binding table",
       "text": "Switch records MAC, IP, VLAN, port and lease for every successful lease"
      }
     ],
     "title": "DHCP snooping in action"
    },
    {
     "type": "cli",
     "device": "SW1 · IOS-style CLI",
     "lines": [
      "SW1(config)# ip dhcp snooping",
      "SW1(config)# ip dhcp snooping vlan 20,30",
      "SW1(config)# interface GigabitEthernet0/24",
      "SW1(config-if)#  description UPLINK-TO-DISTRIBUTION",
      "SW1(config-if)#  ip dhcp snooping trust",
      "SW1(config-if)# interface range GigabitEthernet0/1 - 22",
      "SW1(config-if-range)#  ip dhcp snooping limit rate 15",
      "SW1(config-if-range)# end",
      "SW1# show ip dhcp snooping binding",
      "MacAddress          IpAddress        Lease(sec)  Type           VLAN  Interface",
      "00:50:56:A1:B2:C3   192.168.20.31    84211       dhcp-snooping   20    GigabitEthernet0/5",
      "Total number of bindings: 1"
     ],
     "title": "DHCP snooping on an access switch",
     "note": "Trust only the ports that lead towards legitimate DHCP servers. The rate limit (packets per second) error-disables a port that floods DHCP messages."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Many switches insert **DHCP option 82** (relay agent information) into client requests when snooping is enabled. If the upstream relay or server rejects packets carrying option 82, clients stop getting addresses the moment snooping goes live. Check this first, and adjust the option 82 setting on the switch or the trust settings on the relay to match your design.",
     "title": "When snooping breaks DHCP"
    },
    {
     "type": "cli",
     "device": "SW1 · IOS-style CLI",
     "lines": [
      "SW1(config)# ip arp inspection vlan 20,30",
      "SW1(config)# interface GigabitEthernet0/24",
      "SW1(config-if)#  ip arp inspection trust",
      "SW1(config-if)# end",
      "SW1# show ip arp inspection statistics vlan 20",
      " Vlan      Forwarded        Dropped     DHCP Drops      ACL Drops",
      " ----      ---------        -------     ----------      ---------",
      "   20           5321             14             14              0"
     ],
     "title": "Dynamic ARP inspection",
     "note": "DAI checks every ARP on untrusted ports against the DHCP snooping binding table. An ARP claiming the gateway's IP from a PC port does not match any binding and is dropped (the 14 DHCP drops above). Hosts with static IPs need ARP ACL entries or they will be blocked."
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "DHCP snooping builds the table; DAI and IP source guard **use** it. Enable and verify snooping first, then DAI. Turning DAI on in a VLAN with static-addressed servers and no ARP ACLs is a reliable way to cause an outage.",
     "title": "A chain of trust"
    },
    {
     "type": "scenario",
     "situation": "Several PCs on VLAN 30 suddenly have the default gateway 192.168.30.200 instead of 192.168.30.1 and slow, strange web pages. A student laptop running a home router image was found connected to a desk port. DHCP snooping is enabled on VLAN 20 only. What is the most effective prevention?",
     "options": [
      {
       "text": "Enable DHCP snooping on VLAN 30 too, with only the uplink trusted.",
       "feedback": "Correct. A rogue DHCP server on an untrusted port would then have its offers dropped before any client accepts them.",
       "best": true
      },
      {
       "text": "Reduce the DHCP lease time on the real server.",
       "feedback": "Clients would still accept offers from whichever server answers first.",
       "best": false
      },
      {
       "text": "Enable port security with maximum 1 MAC on the uplink.",
       "feedback": "The uplink carries many MAC addresses; this would break the network and not stop the rogue server.",
       "best": false
      },
      {
       "text": "Add a static ARP entry for the gateway on the router.",
       "feedback": "The problem is wrong DHCP information on clients, not the router's ARP table.",
       "best": false
      }
     ],
     "title": "Odd gateway on the second floor"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which port-security violation mode drops offending frames, logs the event and keeps the port up?",
       "options": [
        "Protect",
        "Shutdown",
        "Restrict",
        "Sticky"
       ],
       "answer": 2,
       "explain": "Restrict drops and logs while keeping the port up. Protect drops silently, shutdown error-disables the port, and sticky is a learning method, not a violation mode."
      },
      {
       "q": "With DHCP snooping enabled, which message is dropped when it arrives on an untrusted port?",
       "options": [
        "DHCP Discover",
        "DHCP Offer",
        "DHCP Request",
        "ARP request for the gateway"
       ],
       "answer": 1,
       "explain": "Offers and Acks are server messages and are dropped on untrusted ports. Discover and Request are client messages and pass; ARP is checked by DAI, not DHCP snooping."
      },
      {
       "q": "What does dynamic ARP inspection use to decide whether an ARP reply is valid?",
       "options": [
        "The DHCP snooping binding table and any ARP ACLs",
        "The default gateway's routing table and its ARP cache",
        "The spanning-tree topology table",
        "The DNS server's PTR records"
       ],
       "answer": 0,
       "explain": "DAI validates IP-to-MAC pairs against snooping bindings (or ARP ACLs for static hosts). Routing, STP and DNS hold no IP-to-MAC bindings for this purpose."
      },
      {
       "q": "After enabling DAI on VLAN 40, a server with a static IP loses connectivity, but DHCP clients are fine. Why?",
       "options": [
        "DAI blocks all servers by design",
        "DAI requires the server to use IPv6",
        "The server's port must be in shutdown mode",
        "The server has no snooping binding or ARP ACL entry"
       ],
       "answer": 3,
       "explain": "Static hosts never appear in the DHCP binding table, so their ARPs fail validation unless an ARP ACL permits them. DAI does not block servers by design, needs no IPv6, and shutting the port would cut it off completely."
      },
      {
       "q": "Which configuration helps prevent VLAN hopping through trunk negotiation on a user port?",
       "options": [
        "Enable sticky MAC learning on the user's access port",
        "Configure the port as a trusted DHCP port",
        "Static access mode with negotiation disabled",
        "Increase the port-security maximum to 10"
       ],
       "answer": 2,
       "explain": "A static access port that does not negotiate cannot become a trunk. Sticky MACs, DHCP trust and MAC limits address other attacks."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l5",
   "title": "VPNs, Firewalls, IPS and Zero Trust",
   "subtitle": "Protect traffic in transit and control what crosses network boundaries.",
   "minutes": 30,
   "objectives": [
    "Compare site-to-site and remote-access VPNs and outline how IPsec protects traffic.",
    "Distinguish stateless ACLs, stateful firewalls, next-generation firewalls, IDS and IPS.",
    "Explain the core principles of zero trust and how they change network design."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "So far the Guard stage has protected devices and access ports. The final layer protects **traffic crossing untrusted networks** — the Internet between a branch and head office — and **traffic crossing boundaries** between zones. Then it questions the boundary itself: in a zero-trust design, being \"inside\" the network earns no automatic trust."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Site-to-site",
       "items": [
        "Connects whole networks (branch ↔ head office, office ↔ cloud)",
        "Gateways build the tunnel; users are unaware",
        "Usually IPsec, always-on",
        "Replaces or backs up private WAN links"
       ]
      },
      {
       "title": "Remote access",
       "items": [
        "Connects one user device to the organisation",
        "VPN client software (IPsec or TLS-based) or a browser portal",
        "Authenticates the user, ideally with MFA",
        "Full tunnel (all traffic) or split tunnel (only corporate traffic)"
       ]
      }
     ],
     "title": "Two kinds of VPN"
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "CONF",
       "title": "Confidentiality",
       "text": "Encryption (for example AES) so captured packets are unreadable."
      },
      {
       "label": "INT",
       "title": "Integrity",
       "text": "A keyed hash detects any change in transit."
      },
      {
       "label": "AUTH",
       "title": "Authentication",
       "text": "Peers prove identity with pre-shared keys or certificates."
      },
      {
       "label": "ANTI",
       "title": "Anti-replay",
       "text": "Sequence numbers stop an attacker re-sending captured packets."
      }
     ],
     "title": "What IPsec provides"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Interesting traffic",
       "text": "Branch gateway sees traffic for head-office subnets"
      },
      {
       "label": "IKE negotiation",
       "text": "Peers authenticate and agree algorithms on UDP 500 (UDP 4500 if NAT is detected)"
      },
      {
       "label": "IPsec SAs",
       "text": "Security associations created for each direction"
      },
      {
       "label": "ESP protects data",
       "text": "Packets encrypted and authenticated inside ESP (IP protocol 50)"
      },
      {
       "label": "Rekey / expire",
       "text": "Keys refreshed on schedule; tunnel torn down when idle or on failure"
      }
     ],
     "title": "Building an IPsec tunnel (concept)"
    },
    {
     "type": "table",
     "head": [
      "Term",
      "Meaning"
     ],
     "rows": [
      [
       "IKEv2",
       "Current key-exchange protocol that negotiates and authenticates IPsec tunnels"
      ],
      [
       "ESP",
       "Encapsulating Security Payload — encryption plus integrity; the normal choice"
      ],
      [
       "AH",
       "Authentication Header (IP protocol 51) — integrity only, no encryption, does not work through NAT"
      ],
      [
       "Tunnel mode",
       "Whole original packet encrypted and given a new outer IP header (site-to-site)"
      ],
      [
       "Transport mode",
       "Only the payload protected; original IP header kept (host-to-host)"
      ],
      [
       "NAT-T",
       "Wraps ESP in UDP 4500 so it can pass through NAT devices"
      ]
     ],
     "title": "IPsec terms"
    },
    {
     "type": "cli",
     "device": "BR1 · IOS-style CLI",
     "lines": [
      "BR1# ping 10.20.0.10 source 192.168.50.1",
      "!!!!!",
      "BR1# show crypto ipsec sa | include pkts",
      "    #pkts encaps: 1520, #pkts encrypt: 1520, #pkts digest: 1520",
      "    #pkts decaps: 1498, #pkts decrypt: 1498, #pkts verify: 1498"
     ],
     "title": "Verifying a site-to-site tunnel",
     "note": "Rising encrypt **and** decrypt counters prove traffic is flowing both ways through the tunnel. Encrypts rising with zero decrypts usually means the far end is not sending back — check its policy, routing or a firewall blocking ESP/UDP 4500."
    },
    {
     "type": "cli",
     "device": "Linux laptop · WireGuard",
     "lines": [
      "# /etc/wireguard/corp.conf — split-tunnel remote access",
      "[Interface]",
      "PrivateKey = <laptop-private-key>",
      "Address = 10.200.0.15/32",
      "DNS = 10.0.50.11",
      "#",
      "[Peer]",
      "PublicKey = <gateway-public-key>",
      "Endpoint = vpn.branch.example:51820",
      "AllowedIPs = 10.0.0.0/8, 192.168.0.0/16"
     ],
     "title": "A modern open-source remote-access VPN",
     "note": "`AllowedIPs` lists only corporate ranges, so this is a **split tunnel**: Internet traffic goes directly. Setting it to `0.0.0.0/0` would make it a **full tunnel**. Private keys never leave the device."
    },
    {
     "type": "table",
     "head": [
      "Device",
      "What it inspects",
      "Action",
      "Notes"
     ],
     "rows": [
      [
       "ACL (stateless)",
       "Each packet's addresses, protocol and ports",
       "Permit or deny",
       "No memory of connections; return traffic needs its own rule"
      ],
      [
       "Stateful firewall",
       "Tracks connections in a state table",
       "Allows replies automatically",
       "Default policy: inside may start sessions out; outside may not start sessions in"
      ],
      [
       "Next-generation firewall",
       "Applications, users, URLs, files; optional TLS inspection",
       "Granular allow/deny, often integrated IPS",
       "Policy by app and identity, not just ports"
      ],
      [
       "IDS",
       "Copy of traffic (SPAN or tap)",
       "Alerts only",
       "Cannot stop the packet it detects"
      ],
      [
       "IPS",
       "Traffic inline",
       "Can drop and block in real time",
       "A false positive can block legitimate traffic — tune carefully"
      ]
     ],
     "title": "Inspection devices compared"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "**Inside** (staff), **Guest**, **DMZ** (public booking server) and **Outside** (Internet). Typical policy: Inside → Outside allowed with inspection; Outside → DMZ only HTTPS to the booking server; Guest → Outside only; nothing from Guest or Outside to Inside. Every rule has an owner and a reason.",
     "title": "Zones in a branch firewall"
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "ID",
       "title": "Verify explicitly",
       "text": "Every request is authenticated and authorised using identity, device health and context — every time."
      },
      {
       "label": "LP",
       "title": "Least privilege",
       "text": "Users and devices reach only the applications they need, not whole networks."
      },
      {
       "label": "SEG",
       "title": "Micro-segmentation",
       "text": "Small zones limit how far an intruder can move laterally."
      },
      {
       "label": "BRCH",
       "title": "Assume breach",
       "text": "Design as if an attacker is already inside: monitor, log and limit blast radius."
      },
      {
       "label": "CONT",
       "title": "Continuous evaluation",
       "text": "Trust is re-checked during the session as risk changes."
      }
     ],
     "title": "Zero trust in five principles"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Perimeter model",
       "items": [
        "Inside the firewall = trusted",
        "VPN puts a user on the whole network",
        "Flat internal networks",
        "One breach exposes much of the estate"
       ]
      },
      {
       "title": "Zero-trust model",
       "items": [
        "Location alone grants nothing",
        "Access per application after identity and device checks",
        "Segmented networks and policy enforcement points",
        "Breaches are contained and visible"
       ]
      }
     ],
     "title": "Traditional perimeter vs zero trust"
    },
    {
     "type": "scenario",
     "situation": "A Khulna NGO gives field staff a full-tunnel VPN that places them on the head-office LAN with access to every server. A stolen laptop with a saved VPN password was used to browse the finance share. Which change best applies zero-trust thinking?",
     "options": [
      {
       "text": "Require MFA and device-health checks, and grant per-application access instead of whole-network access.",
       "feedback": "Correct. Identity plus device verification would have stopped the stolen laptop, and per-app access limits what any single account can reach.",
       "best": true
      },
      {
       "text": "Switch from full tunnel to split tunnel.",
       "feedback": "Split tunnelling changes where Internet traffic goes; it does not limit access to internal servers.",
       "best": false
      },
      {
       "text": "Move the VPN to a different port number.",
       "feedback": "Obscuring the port does not stop someone with a working client and password.",
       "best": false
      },
      {
       "text": "Add an IDS to alert on finance share access.",
       "feedback": "Detection helps, but alerts alone would not have prevented the access.",
       "best": false
      }
     ],
     "title": "Remote staff and the old VPN"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Vulnerability",
       "def": "A weakness in a system, configuration or process that a threat could use."
      },
      {
       "term": "CIA triad",
       "def": "Confidentiality, integrity and availability — the three core goals of information security."
      },
      {
       "term": "Phishing",
       "def": "Social engineering through deceptive messages that steal credentials or install malware."
      },
      {
       "term": "MFA",
       "def": "Multi-factor authentication: proof from two or more categories — know, have, are."
      },
      {
       "term": "AAA",
       "def": "Authentication, authorisation and accounting — usually provided centrally by RADIUS or TACACS+."
      },
      {
       "term": "TACACS+",
       "def": "AAA protocol on TCP 49 that encrypts the full payload and supports per-command authorisation."
      },
      {
       "term": "Extended ACL",
       "def": "An ACL that matches protocol, source, destination and ports; normally placed close to the source."
      },
      {
       "term": "Implicit deny",
       "def": "The invisible final rule of every ACL that drops anything not matched earlier."
      },
      {
       "term": "Port security",
       "def": "Switch feature that limits and learns the MAC addresses allowed on a port."
      },
      {
       "term": "DHCP snooping",
       "def": "Switch feature that drops DHCP server messages on untrusted ports and builds an IP-MAC binding table."
      },
      {
       "term": "DAI",
       "def": "Dynamic ARP inspection: drops ARP messages that do not match trusted IP-to-MAC bindings."
      },
      {
       "term": "IPsec",
       "def": "Suite of protocols (IKE, ESP, AH) that authenticate and encrypt IP traffic, typically for VPNs."
      },
      {
       "term": "IPS",
       "def": "Intrusion prevention system: inline device that detects and blocks malicious traffic."
      },
      {
       "term": "Zero trust",
       "def": "Security model that grants no implicit trust based on network location and verifies every request."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which IPsec protocol provides encryption and is normally used for VPN data?",
       "options": [
        "AH, IP protocol 51",
        "IKE, UDP 500",
        "GRE, IP protocol 47",
        "ESP, IP protocol 50"
       ],
       "answer": 3,
       "explain": "ESP encrypts and authenticates the payload. AH provides integrity only, IKE negotiates keys rather than carrying data, and GRE is an unencrypted tunnelling protocol."
      },
      {
       "q": "A site-to-site tunnel shows encrypt counters rising but decrypt counters stuck at zero. What is the most likely situation?",
       "options": [
        "The tunnel is healthy and idle in both directions",
        "Packets go out through the tunnel but none come back",
        "The local router cannot encrypt any traffic",
        "The peers have not yet started the IKE negotiation at all"
       ],
       "answer": 1,
       "explain": "Encrypts prove local packets enter the tunnel; zero decrypts mean nothing returns, pointing to the far end's policy, routing or a blocked path. An idle tunnel would not show rising encrypts, encryption is working locally, and without IKE there would be no SAs or counters."
      },
      {
       "q": "What is the key difference between an IDS and an IPS?",
       "options": [
        "An IPS sits inline and can block traffic; an IDS only alerts",
        "An IDS encrypts traffic; an IPS only decrypts it",
        "An IPS works only on wireless networks, an IDS only on wired ones",
        "An IDS replaces the need for a firewall"
       ],
       "answer": 0,
       "explain": "IPS is inline and can drop packets, while IDS watches a copy and alerts. Neither is an encryption device, IPS is not wireless-only, and neither replaces a firewall."
      },
      {
       "q": "A remote-access VPN sends only traffic for 10.0.0.0/8 through the tunnel, while web browsing goes direct. What is this called?",
       "options": [
        "Full tunnelling",
        "IPsec transport mode",
        "Split tunnelling",
        "NAT traversal"
       ],
       "answer": 2,
       "explain": "Sending only corporate prefixes through the tunnel is split tunnelling. Full tunnel sends everything, transport mode is an IPsec encapsulation choice, and NAT-T lets ESP cross NAT."
      },
      {
       "q": "Which statement best reflects zero trust?",
       "options": [
        "Devices on the internal LAN are trusted automatically",
        "A strong perimeter firewall removes the need for segmentation",
        "VPN users should reach the entire internal network",
        "Each request is verified using identity, device and context"
       ],
       "answer": 3,
       "explain": "Zero trust removes implicit trust based on location and verifies each request. The other options describe the traditional perimeter model zero trust replaces."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m8",
 "order": 8,
 "code": "Automate",
 "title": "Automation, Programmability and Readiness",
 "subtitle": "Controllers, APIs, data formats, configuration as code, AI-assisted operations — then the whole journey and the capstone.",
 "outcomes": [
  "Compare traditional and controller-based networking and explain planes and APIs.",
  "Use REST concepts, HTTP verbs and status codes, and read JSON, YAML and YANG-modelled data.",
  "Explain idempotent configuration management with Ansible and read a short Python audit script.",
  "Describe intent-based networking and apply verification and safety to AI-assisted operations.",
  "Trace and troubleshoot a packet through all eight stages and plan the ZCNA capstone and exam."
 ],
 "lessons": [
  {
   "id": "m8-l1",
   "title": "Why Automate — Traditional vs Controller-Based Networking",
   "subtitle": "Planes, controllers, SDN and the APIs that connect them.",
   "minutes": 25,
   "objectives": [
    "Explain the business and technical reasons to automate network operations.",
    "Separate the data, control and management planes and describe what a controller centralises.",
    "Distinguish northbound from southbound interfaces and name common southbound protocols."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Everything you have configured so far — VLANs, OSPF, NAT, ACLs, SSIDs — you typed into one device at a time. That works for a lab. For a bank with 300 branches it means thousands of nearly identical changes, each a chance for a typo at 23:00. The **Automate** stage is about making the network **consistent, fast to change, and provable**: the computer does the repetitive work, and engineers design, review and verify."
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "CONS",
       "title": "Consistency",
       "text": "Every device gets the same tested configuration; drift from the standard is detected automatically."
      },
      {
       "label": "SPD",
       "title": "Speed",
       "text": "A change to 300 branches takes minutes, not weeks, and new sites are built from a template."
      },
      {
       "label": "ERR",
       "title": "Fewer errors",
       "text": "Most outages are caused by human change errors; scripts do not mistype IP addresses."
      },
      {
       "label": "AUD",
       "title": "Evidence",
       "text": "Every change is recorded in version control: who, what, when and why."
      },
      {
       "label": "SCAL",
       "title": "Scale",
       "text": "A small team can run a large network and spend time on design instead of copy-paste."
      }
     ],
     "title": "Why organisations automate"
    },
    {
     "type": "layers",
     "items": [
      {
       "label": "Management plane",
       "parts": [
        "How engineers and tools configure and monitor the device",
        "SSH, SNMP, syslog, NETCONF, RESTCONF, APIs"
       ]
      },
      {
       "label": "Control plane",
       "parts": [
        "How the device decides where traffic goes",
        "OSPF, STP, ARP, routing and MAC tables built here"
       ]
      },
      {
       "label": "Data plane",
       "parts": [
        "How the device actually forwards traffic",
        "Frame and packet forwarding, ACLs and QoS at line rate"
       ]
      }
     ],
     "title": "The three planes of a network device"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Traditional (distributed)",
       "items": [
        "Each device has its own control and management plane",
        "Configured box by box through the CLI",
        "Network-wide view lives in engineers' heads and spreadsheets",
        "Changes are slow and inconsistent at scale"
       ]
      },
      {
       "title": "Controller-based / SDN",
       "items": [
        "A **controller** holds the network-wide view and policy",
        "Devices are programmed by the controller through APIs",
        "Engineers express policy once; the controller pushes it everywhere",
        "Telemetry flows back for assurance and troubleshooting"
       ]
      }
     ],
     "title": "Traditional vs controller-based networking"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "An approach where the control and management of the network are centralised in software (the controller) and exposed through APIs, while devices focus on forwarding. Pure SDN moves the control plane entirely; most enterprise products today keep distributed routing protocols on devices and centralise management, policy and visibility.",
     "title": "Software-defined networking (SDN)"
    },
    {
     "type": "layers",
     "items": [
      {
       "label": "Applications and orchestration",
       "parts": [
        "Scripts, IT service management, dashboards, automation pipelines"
       ]
      },
      {
       "label": "Northbound API",
       "parts": [
        "Usually a REST API with JSON",
        "Lets applications ask the controller for data or request changes"
       ]
      },
      {
       "label": "Controller",
       "parts": [
        "Network-wide view, policy, inventory, assurance"
       ]
      },
      {
       "label": "Southbound interfaces",
       "parts": [
        "NETCONF, RESTCONF, gNMI, OpenFlow, or SSH/CLI and SNMP for older devices"
       ]
      },
      {
       "label": "Network devices",
       "parts": [
        "Switches, routers, APs, firewalls"
       ]
      }
     ],
     "title": "Where the APIs sit"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Underlay",
       "items": [
        "The physical routed network",
        "Simple, stable IP connectivity between devices (often OSPF or another IGP)",
        "Rarely changes"
       ]
      },
      {
       "title": "Overlay",
       "items": [
        "Virtual networks built on top of the underlay with tunnels (for example VXLAN)",
        "Segments and policies follow users and workloads",
        "Changes frequently, driven by the controller"
       ]
      }
     ],
     "title": "Underlay and overlay in a controller-managed fabric"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A controller can push a broken design to 300 sites in two minutes. You still need to understand subnets, VLANs, routing and ACLs — to design the intent, to review what the automation will do and to troubleshoot when the overlay hides a broken underlay.",
     "title": "Automation does not replace fundamentals"
    },
    {
     "type": "scenario",
     "situation": "A district education office manages 45 schools, each with one router, two switches and four APs. Two engineers make every change by SSH. Last term, an ACL typo at one school blocked exam results uploads for a day. They have a small budget. What is the most sensible first step?",
     "options": [
      {
       "text": "Standardise each school's configuration into a template and push changes with an automation tool from version control, after a peer review.",
       "feedback": "Correct. It tackles the real causes — inconsistency and unreviewed manual changes — with low cost and builds a foundation for a controller later.",
       "best": true
      },
      {
       "text": "Buy a full SDN fabric for all 45 schools immediately.",
       "feedback": "A large platform without standards or skills often moves the chaos into a new tool, and the budget is small.",
       "best": false
      },
      {
       "text": "Keep using SSH but ask engineers to type more carefully.",
       "feedback": "Human carefulness does not scale; the same class of error will recur.",
       "best": false
      },
      {
       "text": "Stop making changes during term time.",
       "feedback": "Avoiding change does not fix risky change; urgent changes will still be needed.",
       "best": false
      }
     ],
     "title": "Which approach for the school network?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "OSPF calculating best paths belongs to which plane?",
       "options": [
        "Data plane",
        "Management plane",
        "Control plane",
        "Application plane"
       ],
       "answer": 2,
       "explain": "Routing protocols build the forwarding decisions, which is the control plane. The data plane forwards packets, the management plane configures and monitors, and the application plane sits above the controller."
      },
      {
       "q": "An IT ticketing system asks the controller for a list of devices with high CPU. Which interface is it using?",
       "options": [
        "A southbound interface to the switches",
        "The controller's northbound API",
        "The console port of each device",
        "The data plane of the access switches"
       ],
       "answer": 1,
       "explain": "Applications talk to the controller through its northbound API. Southbound interfaces connect the controller to devices, and console ports or the data plane are not APIs for applications."
      },
      {
       "q": "Which of these is a southbound protocol a controller might use to configure devices?",
       "options": [
        "HTTP status code 200",
        "DHCP option 43",
        "Syslog severity 5",
        "NETCONF"
       ],
       "answer": 3,
       "explain": "NETCONF is a device configuration protocol used southbound. A status code is part of HTTP responses, DHCP option 43 passes vendor data to clients, and syslog severities classify messages."
      },
      {
       "q": "In a fabric, what is the underlay?",
       "options": [
        "The physical IP network that carries the overlay tunnels",
        "The virtual networks that users and devices are placed into",
        "The northbound REST API of the controller",
        "The wireless SSIDs that clients join"
       ],
       "answer": 0,
       "explain": "The underlay is the routed physical network; overlays (such as VXLAN segments) ride on top of it. APIs and SSIDs are other layers entirely."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l2",
   "title": "REST APIs, JSON and YAML",
   "subtitle": "Talk to controllers and devices programmatically and read the data they return.",
   "minutes": 30,
   "objectives": [
    "Map HTTP verbs to create, read, update and delete operations and interpret status codes.",
    "Read and write valid JSON and YAML and spot common syntax errors.",
    "Describe how model-driven interfaces (YANG with NETCONF or RESTCONF) structure device data."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A **REST API** lets software talk to a controller or device using the same HTTP that web browsers use. Instead of screen-scraping CLI output, a script sends a request to a URL and receives **structured data** — usually JSON — that it can process reliably. Reading API documentation and responses is now a core associate skill."
    },
    {
     "type": "keypoints",
     "items": [
      "**Client–server:** your script is the client; the controller or device is the server.",
      "**Stateless:** every request carries everything needed, including authentication.",
      "**Resources and URIs:** each object has a URL, for example `/api/v1/devices/42`.",
      "**Uniform verbs:** HTTP methods say what you want to do with the resource.",
      "**Representations:** data travels as JSON (or XML), described by headers such as `Content-Type` and `Accept`."
     ],
     "title": "REST in practice"
    },
    {
     "type": "table",
     "head": [
      "Verb",
      "CRUD action",
      "Example",
      "Safe to repeat?"
     ],
     "rows": [
      [
       "GET",
       "Read",
       "List interfaces or one device's details",
       "Yes — read only"
      ],
      [
       "POST",
       "Create",
       "Add a new VLAN or site",
       "No — may create duplicates"
      ],
      [
       "PUT",
       "Update (replace)",
       "Replace a whole object with the body sent",
       "Yes — same result each time"
      ],
      [
       "PATCH",
       "Update (partial)",
       "Change only the description field",
       "Usually"
      ],
      [
       "DELETE",
       "Delete",
       "Remove a VLAN",
       "Yes — it is gone after the first call"
      ]
     ],
     "title": "HTTP verbs and CRUD"
    },
    {
     "type": "table",
     "head": [
      "Code",
      "Meaning",
      "What to do"
     ],
     "rows": [
      [
       "200 OK",
       "Request succeeded",
       "Read the body"
      ],
      [
       "201 Created",
       "New resource created (POST)",
       "Note the new ID or location"
      ],
      [
       "204 No Content",
       "Succeeded, nothing to return",
       "Common after PUT, PATCH or DELETE"
      ],
      [
       "400 Bad Request",
       "Malformed request or invalid data",
       "Check the JSON body and field names"
      ],
      [
       "401 Unauthorized",
       "Missing or invalid authentication",
       "Check the token or credentials"
      ],
      [
       "403 Forbidden",
       "Authenticated but not permitted",
       "Check the account's role"
      ],
      [
       "404 Not Found",
       "Resource or URL does not exist",
       "Check the URI and object ID"
      ],
      [
       "429 Too Many Requests",
       "Rate limit hit",
       "Slow down; respect any retry header"
      ],
      [
       "500 Internal Server Error",
       "Server-side failure",
       "Retry later, check server logs"
      ]
     ],
     "title": "HTTP status codes you will see"
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ curl -s -H \"Accept: application/json\" \\",
      "       -H \"Authorization: Bearer $TOKEN\" \\",
      "       https://ctrl.branch.example/api/v1/devices?site=sylhet",
      "{\"devices\": [{\"name\": \"r1\", \"ip\": \"10.0.99.1\", \"role\": \"router\", \"reachable\": true}, {\"name\": \"sw1\", \"ip\": \"10.0.99.11\", \"role\": \"switch\", \"reachable\": false}]}"
     ],
     "title": "A GET request with a bearer token",
     "note": "The token is passed in a header from an environment variable — never hard-coded in scripts or committed to version control. The response is compact JSON; tools like `jq` or Python make it readable."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "JSON",
       "items": [
        "`{`",
        "`  \"hostname\": \"r1\",`",
        "`  \"vlans\": [10, 20],`",
        "`  \"ntp\": {\"server\": \"10.0.99.123\", \"prefer\": true}`",
        "`}`"
       ]
      },
      {
       "title": "YAML",
       "items": [
        "`hostname: r1`",
        "`vlans:`",
        "`  - 10`",
        "`  - 20`",
        "`ntp:`",
        "`  server: 10.0.99.123`",
        "`  prefer: true`"
       ]
      }
     ],
     "title": "The same data in JSON and YAML"
    },
    {
     "type": "table",
     "head": [
      "Element",
      "JSON",
      "YAML"
     ],
     "rows": [
      [
       "Object / dictionary",
       "`{ \"key\": value }`",
       "`key: value` lines at the same indent"
      ],
      [
       "Array / list",
       "`[1, 2, 3]`",
       "Lines starting with `- `"
      ],
      [
       "String",
       "Always in double quotes",
       "Quotes optional (needed for special characters)"
      ],
      [
       "Boolean / null",
       "`true`, `false`, `null`",
       "`true`, `false`, `null` (or `~`)"
      ],
      [
       "Comments",
       "Not allowed",
       "`# comment`"
      ],
      [
       "Structure",
       "Braces and brackets; whitespace ignored",
       "**Indentation** defines structure; use spaces, never tabs"
      ]
     ],
     "title": "Reading structured data"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "JSON: single quotes, a trailing comma after the last item, or a missing comma between items. YAML: mixing tabs and spaces, inconsistent indentation, or forgetting the space after `-` or `:`. A validator or linter catches these in seconds — run one before every commit.",
     "title": "Classic syntax mistakes"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "**YANG** (RFC 7950) is a modelling language that describes device data — interfaces, routes, VLANs — as a precise tree. **NETCONF** (RFC 6241, SSH on TCP 830, XML) and **RESTCONF** (RFC 8040, HTTPS, JSON or XML) read and change data that follows those models. Standard models such as `ietf-interfaces` work across many platforms.",
     "title": "Model-driven programmability"
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ curl -s -u netauto --cacert ca.pem \\",
      "       -H \"Accept: application/yang-data+json\" \\",
      "       https://10.0.99.1/restconf/data/ietf-interfaces:interfaces/interface=Loopback0",
      "{",
      "  \"ietf-interfaces:interface\": [",
      "    {",
      "      \"name\": \"Loopback0\",",
      "      \"type\": \"iana-if-type:softwareLoopback\",",
      "      \"enabled\": true",
      "    }",
      "  ]",
      "}"
     ],
     "title": "RESTCONF: reading a standard YANG model",
     "note": "The URL follows the YANG tree: module `ietf-interfaces`, container `interfaces`, list `interface` keyed by name. `-u netauto` without a password makes curl prompt for it, and `--cacert` verifies the device's certificate instead of disabling TLS checks."
    },
    {
     "type": "scenario",
     "situation": "An automation job that adds guest VLANs through the controller's API worked yesterday. Tonight every POST returns `401 Unauthorized`; GET requests from an engineer's browser session still work. What is the most likely cause?",
     "options": [
      {
       "text": "The job's API token has expired or been revoked, so its requests are no longer authenticated.",
       "feedback": "Correct. 401 means authentication failed for that client. The engineer's separate session still being valid points to the job's own credential.",
       "best": true
      },
      {
       "text": "The JSON body has a trailing comma.",
       "feedback": "Malformed bodies normally return 400 Bad Request, not 401.",
       "best": false
      },
      {
       "text": "The VLAN already exists.",
       "feedback": "Duplicates usually produce a conflict or validation error, and the job is failing for every VLAN.",
       "best": false
      },
      {
       "text": "The controller is overloaded.",
       "feedback": "Overload shows as 429, 503 or timeouts rather than an authentication failure.",
       "best": false
      }
     ],
     "title": "A 401 at midnight"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which HTTP verb should a script use to read the list of VLANs without changing anything?",
       "options": [
        "POST",
        "GET",
        "PUT",
        "PATCH"
       ],
       "answer": 1,
       "explain": "GET is the read-only method. POST creates, PUT replaces and PATCH partially updates resources."
      },
      {
       "q": "An API returns `403 Forbidden`. What does this tell you?",
       "options": [
        "Your credentials were not sent or are invalid",
        "The URL you requested does not exist",
        "The server crashed while processing the request",
        "Authenticated, but not permitted to do this"
       ],
       "answer": 3,
       "explain": "403 is an authorisation failure for a known identity. Missing or invalid credentials give 401, a wrong URL gives 404, and server faults give 5xx codes."
      },
      {
       "q": "Which JSON snippet is valid?",
       "options": [
        "`{\"vlan\": 20, \"name\": \"GUEST\"}`",
        "`{'vlan': 20, 'name': 'GUEST'}`",
        "`{\"vlan\": 20, \"name\": \"GUEST\",}`",
        "`{vlan: 20, name: GUEST}`"
       ],
       "answer": 0,
       "explain": "JSON requires double-quoted keys and strings and forbids trailing commas. Single quotes, a trailing comma and unquoted keys or strings are all invalid."
      },
      {
       "q": "In YAML, what defines which keys belong inside `ntp:`?",
       "options": [
        "Curly braces that must wrap around the nested keys",
        "A semicolon at the end of each line",
        "Consistent indentation with spaces beneath it",
        "Tab characters before each nested key"
       ],
       "answer": 2,
       "explain": "YAML nesting is expressed by indentation using spaces. Braces are optional flow style, semicolons are not YAML syntax, and tabs are not allowed for indentation."
      },
      {
       "q": "Which statement about RESTCONF is correct?",
       "options": [
        "It uses SNMP traps to push configuration",
        "It replaces YANG with free-form CLI text",
        "It uses HTTPS to work with YANG-modelled data",
        "It runs only over Telnet on TCP 23"
       ],
       "answer": 2,
       "explain": "RESTCONF is an HTTPS-based interface to YANG data. It is not SNMP, it depends on YANG rather than replacing it, and it never uses Telnet."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l3",
   "title": "Configuration Management, Ansible and a First Python Script",
   "subtitle": "Treat configuration as code: templates, playbooks, idempotency and version control.",
   "minutes": 35,
   "objectives": [
    "Explain idempotency and why it makes automation safe to re-run.",
    "Read an Ansible inventory and playbook and predict the result of a check run.",
    "Read and adapt a short Python script that audits device data."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "**Configuration management** means describing how devices *should* be configured, storing that description in version control, and letting a tool make reality match it. The description becomes the **source of truth**; the tool reports and corrects **drift**. This is the heart of \"network as code\"."
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Source of truth",
       "text": "Inventory and variables: sites, IPs, VLANs, standard servers"
      },
      {
       "label": "Templates",
       "text": "Jinja2 templates turn variables into device configuration"
      },
      {
       "label": "Review",
       "text": "Changes proposed in Git; a colleague reviews the diff"
      },
      {
       "label": "Dry run",
       "text": "Check mode shows exactly what would change"
      },
      {
       "label": "Deploy and verify",
       "text": "Apply in a window, then run automated tests and show commands"
      }
     ],
     "title": "A network-as-code workflow"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "An operation is **idempotent** if running it once or ten times leaves the system in the same state. An idempotent task that adds `ntp server 10.0.99.123` changes nothing on a device that already has it and reports `ok`, not `changed`. This makes automation safe to re-run and turns every run into a compliance check.",
     "title": "Idempotency"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "How it works",
       "items": [
        "**Agentless**: connects over SSH (or HTTPS APIs) — nothing installed on network devices",
        "Runs from a control node such as a Linux VM",
        "Playbooks written in YAML"
       ]
      },
      {
       "title": "Key parts",
       "items": [
        "**Inventory**: which devices, in which groups, with which variables",
        "**Playbook**: ordered plays and tasks",
        "**Modules**: units of work, such as push config or gather facts",
        "**Templates**: Jinja2 files that generate config"
       ]
      }
     ],
     "title": "Ansible at a glance"
    },
    {
     "type": "cli",
     "device": "Ansible control node · inventory.yml",
     "lines": [
      "all:",
      "  children:",
      "    school_routers:",
      "      hosts:",
      "        sch-rtr-01: { ansible_host: 10.30.1.1 }",
      "        sch-rtr-02: { ansible_host: 10.30.2.1 }",
      "      vars:",
      "        ansible_connection: ansible.netcommon.network_cli",
      "        ansible_network_os: <platform-collection>.<os>   # set for your platform",
      "        ansible_user: netauto",
      "        ntp_server: 10.0.99.123"
     ],
     "title": "Inventory: who and how",
     "note": "Group variables apply to every host in the group. The network OS value comes from the collection for your platform; credentials come from a vault or prompt, never from plain text in the file."
    },
    {
     "type": "cli",
     "device": "Ansible control node · baseline.yml",
     "lines": [
      "- name: Apply NTP and logging baseline to school routers",
      "  hosts: school_routers",
      "  gather_facts: false",
      "  tasks:",
      "    - name: Ensure standard NTP and syslog lines are present",
      "      ansible.netcommon.cli_config:",
      "        config: |",
      "          ntp server {{ ntp_server }}",
      "          logging host 10.0.99.60"
     ],
     "title": "Playbook: what to do",
     "note": "`{{ ntp_server }}` is filled from the inventory. Platform-specific resource modules give the strongest idempotency; this generic module relies on the platform comparing the running configuration before pushing."
    },
    {
     "type": "cli",
     "device": "Ansible control node",
     "lines": [
      "$ ansible-playbook -i inventory.yml baseline.yml --check --diff",
      "PLAY [Apply NTP and logging baseline to school routers] ****",
      "TASK [Ensure standard NTP and syslog lines are present] ****",
      "ok: [sch-rtr-01]",
      "changed: [sch-rtr-02]",
      "PLAY RECAP ****",
      "sch-rtr-01 : ok=1  changed=0  unreachable=0  failed=0  skipped=0  rescued=0  ignored=0",
      "sch-rtr-02 : ok=1  changed=1  unreachable=0  failed=0  skipped=0  rescued=0  ignored=0"
     ],
     "title": "A dry run before the real change",
     "note": "`--check` makes no changes; `--diff` shows what would change. Router 01 already complies (`ok`), router 02 has drifted (`changed`). Run again without `--check` in the change window, then once more — the second real run should report zero changes."
    },
    {
     "type": "cli",
     "device": "Jinja2 template · access-switch.j2",
     "lines": [
      "hostname {{ hostname }}",
      "{% for vlan in vlans %}",
      "vlan {{ vlan.id }}",
      " name {{ vlan.name }}",
      "{% endfor %}",
      "ntp server {{ ntp_server }}"
     ],
     "title": "One template, many switches",
     "note": "Feed it a different hostname and VLAN list per site and every switch gets a consistent, correctly formatted configuration."
    },
    {
     "type": "cli",
     "device": "Python 3 · ntp_audit.py",
     "lines": [
      "import json",
      "STANDARD_NTP = \"10.0.99.123\"",
      "with open(\"devices.json\", encoding=\"utf-8\") as f:",
      "    devices = json.load(f)          # a list of dictionaries",
      "for dev in devices:",
      "    status = \"OK\" if dev[\"ntp\"] == STANDARD_NTP else \"FIX\"",
      "    print(f\"{dev['name']:<10} {dev['ntp']:<15} {status}\")"
     ],
     "title": "A tiny, vendor-neutral audit script",
     "note": "The script reads exported device data, compares one field with the standard and prints a report. Indentation defines the loop body in Python, just as indentation defines nesting in YAML."
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ cat devices.json",
      "[{\"name\": \"sch-rtr-01\", \"ntp\": \"10.0.99.123\"},",
      " {\"name\": \"sch-rtr-02\", \"ntp\": \"192.168.1.1\"}]",
      "$ python3 ntp_audit.py",
      "sch-rtr-01 10.0.99.123     OK",
      "sch-rtr-02 192.168.1.1     FIX"
     ],
     "title": "Running the audit",
     "note": "Next steps would be to fetch the data live through an API instead of a file, and to feed the FIX list into the Ansible playbook."
    },
    {
     "type": "case",
     "title": "Rangpur school-district automation project",
     "context": "A district education office near Rangpur manages 45 schools. Each has a router, two access switches and four APs. Two engineers make all changes by SSH using notes in a shared document. Recently: an ACL typo blocked exam-result uploads at one school; three schools still use an old NTP server; and nobody can say which switches have Telnet enabled. The office has one Linux server, a small budget and engineers who know basic CLI but not programming.",
     "questions": [
      "What would you automate first, and why?",
      "What is the minimum source of truth they need?",
      "How would you make changes safe?",
      "How would you measure success after one term?"
     ],
     "answer": "Start with **read-only** automation: a scheduled playbook or script that collects configurations and reports compliance (NTP server, Telnet disabled, SSH v2, standard ACLs). It is low-risk, builds skills and immediately answers the Telnet question. The minimum source of truth is a version-controlled inventory (YAML) listing each school's devices, management IPs, subnets and VLANs, plus standard values such as NTP and syslog servers. Make changes safe with templates for the standard ACL and baseline, peer review of every change in Git, `--check --diff` dry runs, a pilot on two schools before all 45, and saved pre-change configurations for rollback. Measure: number of devices compliant with the baseline (target 100%), change-related incidents per term, time to apply a district-wide change, and time to build a new school from template."
    },
    {
     "type": "template",
     "title": "Automation inventory",
     "purpose": "Capture what each device needs for automation before writing any playbook.",
     "columns": [
      "Device",
      "Site",
      "Role",
      "Mgmt IP",
      "Access method",
      "Platform / OS",
      "Baseline compliant?"
     ],
     "example": [
      [
       "sch-rtr-01",
       "Pirganj High School",
       "Router",
       "10.30.1.1",
       "SSH (network_cli)",
       "IOS-style router",
       "Yes"
      ],
      [
       "sch-sw-01a",
       "Pirganj High School",
       "Access switch",
       "10.30.1.11",
       "SSH (network_cli)",
       "IOS-style switch",
       "No — Telnet on"
      ]
     ],
     "rows": 8
    },
    {
     "type": "scenario",
     "situation": "You run a playbook that should enforce SSH-only VTY lines on 45 routers. The first real run reports `changed` on 12 routers. You immediately run it again with no other changes, and it again reports `changed` on the same 12. What does this most likely mean?",
     "options": [
      {
       "text": "The task is not idempotent — something in the desired lines never matches how the device stores them, so it re-pushes every time.",
       "feedback": "Correct. A properly idempotent task would report `ok` on the second run. Compare the pushed lines with the running configuration format to find the mismatch.",
       "best": true
      },
      {
       "text": "The 12 routers are reverting the change automatically.",
       "feedback": "Possible in theory, but the far more common cause is a task that never matches the stored configuration.",
       "best": false
      },
      {
       "text": "This is normal; Ansible always reports changed.",
       "feedback": "Ansible reports `ok` when nothing needs changing; repeated `changed` is a warning sign.",
       "best": false
      },
      {
       "text": "The other 33 routers failed silently.",
       "feedback": "They reported `ok`, which means they already complied, not that they failed.",
       "best": false
      }
     ],
     "title": "The second run"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A task runs twice on the same device and reports `changed` the first time and `ok` the second. What property does this show?",
       "options": [
        "Statelessness",
        "Idempotency",
        "Encapsulation",
        "Redundancy"
       ],
       "answer": 1,
       "explain": "Same end state on repeated runs is idempotency. Statelessness describes REST requests, encapsulation is about headers, and redundancy is about backup paths."
      },
      {
       "q": "Why is Ansible described as agentless for network devices?",
       "options": [
        "It needs an agent only on routers, not on switches",
        "It runs entirely inside the network controller's own software",
        "It uses SNMP traps instead of connections",
        "It uses SSH or APIs and installs nothing on devices"
       ],
       "answer": 3,
       "explain": "Ansible works through existing management interfaces. It installs nothing on any device type, runs from a control node rather than inside a controller, and does not rely on SNMP traps."
      },
      {
       "q": "What does `--check` add to an `ansible-playbook` run?",
       "options": [
        "It predicts changes without applying them",
        "It applies changes and then rolls them back",
        "It checks only YAML syntax and exits",
        "It forces every task to report changed"
       ],
       "answer": 0,
       "explain": "Check mode is a dry run that reports what would change. It does not apply and roll back, it goes further than a syntax check, and it does not force changed results."
      },
      {
       "q": "In the Python audit script, what does `json.load(f)` return for the sample file?",
       "options": [
        "A single long string of text",
        "A list of dictionaries, one per device",
        "A YAML document",
        "A dictionary of lists, one per field"
       ],
       "answer": 1,
       "explain": "The file is a JSON array of objects, which Python loads as a list of dicts. It is parsed rather than left as a string, it is not YAML, and its top level is an array, not an object of lists."
      },
      {
       "q": "Which file in an Ansible project lists the devices and their groups?",
       "options": [
        "The playbook",
        "The Jinja2 template",
        "The inventory",
        "The module documentation"
       ],
       "answer": 2,
       "explain": "The inventory defines hosts, groups and variables. Playbooks define tasks, templates generate config text, and module docs describe options."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l4",
   "title": "Intent-Based Networking and AI-Assisted Operations",
   "subtitle": "From business intent to verified configuration — with machines helping and humans in charge.",
   "minutes": 25,
   "objectives": [
    "Describe the intent-based networking loop: translate, activate, assure.",
    "Identify realistic uses of AI-assisted tools in network operations.",
    "Apply verification and safety controls to any AI-suggested change."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Automation executes what you tell it. **Intent-based networking** goes one step further: you state *what* you want — \"guest devices may reach only the Internet\", \"voice gets priority at every branch\" — and the system works out *how*, applies it, and continuously checks that reality still matches the intent. AI-assisted tools add analysis and suggestions on top. Both are powerful; both need engineers who can verify the result."
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Intent",
       "text": "Business outcome in plain terms: who may reach what, with what priority"
      },
      {
       "label": "Translate",
       "text": "System converts intent into policies and device configuration"
      },
      {
       "label": "Activate",
       "text": "Configuration pushed through automation to every relevant device"
      },
      {
       "label": "Assure",
       "text": "Telemetry continuously checks the network behaves as intended"
      },
      {
       "label": "Remediate",
       "text": "Deviations raise alerts or trigger approved corrective actions"
      }
     ],
     "title": "The intent-based loop"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "Intent: \"Point-of-sale terminals at every branch may reach only the payment servers on TCP 443.\" The system generates ACLs or segment policies for 120 branches, deploys them, and later raises an alert when a new branch's terminal is seen talking to a file server — before an auditor finds it.",
     "title": "Intent in action"
    },
    {
     "type": "table",
     "head": [
      "Use",
      "What it helps with",
      "Main risk"
     ],
     "rows": [
      [
       "Anomaly detection",
       "Spotting unusual traffic, latency or error patterns against a learned baseline",
       "False alarms or missed slow-burn issues"
      ],
      [
       "Log and alert summarisation",
       "Grouping thousands of events into a few likely incidents",
       "Important detail summarised away"
      ],
      [
       "Natural-language queries",
       "\"Which branches had WAN loss above 2% this week?\"",
       "Wrong query translated into wrong data"
      ],
      [
       "Configuration drafting",
       "First draft of an ACL, template or script",
       "Plausible but wrong or non-existent commands"
      ],
      [
       "Root-cause hints",
       "Correlating a routing change with a jump in tickets",
       "Correlation mistaken for cause"
      ],
      [
       "Capacity forecasting",
       "Predicting when links or APs will saturate",
       "Forecasts based on unusual history"
      ]
     ],
     "title": "Realistic uses of AI-assisted network operations"
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "GRND",
       "title": "Ground",
       "text": "Give the tool real, current context — topology, standards, the actual outputs — and remove secrets first."
      },
      {
       "label": "PROP",
       "title": "Propose",
       "text": "Treat the output as a proposal, never as an approved change."
      },
      {
       "label": "REV",
       "title": "Review",
       "text": "An engineer checks every line against documentation, the design and the ACL or change rules."
      },
      {
       "label": "TEST",
       "title": "Test",
       "text": "Try it in a lab, simulator or digital twin; run a check-mode dry run."
      },
      {
       "label": "APPL",
       "title": "Apply",
       "text": "Deploy through the normal change process, with a rollback ready."
      },
      {
       "label": "VER",
       "title": "Verify",
       "text": "Confirm with show commands, tests and monitoring that the intent is met."
      }
     ],
     "title": "The ZCNA safe-assist loop"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Never paste configurations containing passwords, keys, SNMP strings or customer data into tools your organisation has not approved. Give automated agents **read-only** credentials by default, require human approval for any change, and log every action they take. An assistant that can change 300 routers can also break 300 routers.",
     "title": "Data and access safety"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Healthy",
       "items": [
        "Summarise logs, then confirm the key events yourself",
        "Draft a template, then review and lab-test it",
        "Ask for likely causes, then prove one with evidence",
        "Keep humans accountable for every change"
       ]
      },
      {
       "title": "Unhealthy",
       "items": [
        "Paste a suggested command straight into production",
        "Trust a summary without reading the source",
        "Share full configurations with unapproved tools",
        "Let a tool make changes with admin rights and no approval"
       ]
      }
     ],
     "title": "Healthy and unhealthy use"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "! Suggested by an assistant: 'permit tcp any host 10.20.0.10 eq 443'",
      "! Review: does this match the policy 'tellers only'? No - 'any' is too broad.",
      "! Corrected after review:",
      "R1(config)# ip access-list extended TELLER-POLICY",
      "R1(config-ext-nacl)#  25 permit tcp 192.168.50.0 0.0.0.255 host 10.20.0.10 eq 443",
      "R1(config-ext-nacl)# end",
      "R1# show access-lists TELLER-POLICY | include 25",
      "    25 permit tcp 192.168.50.0 0.0.0.255 host 10.20.0.10 eq 443 (0 matches)"
     ],
     "title": "Reviewing a suggested change",
     "note": "The suggestion was syntactically valid but violated the intent. Review compares each line with the policy, not just with the syntax — then hit counters confirm the line is used."
    },
    {
     "type": "checklist",
     "title": "Before applying any AI-suggested or auto-generated change",
     "items": [
      "Secrets and customer data removed from anything shared with the tool.",
      "Every command exists on the target platform and version (checked in documentation or lab).",
      "The change matches the written policy or intent, not just the symptom.",
      "Blast radius understood: which devices, users and services are affected.",
      "Dry run or lab test completed, with output saved.",
      "Peer review and change approval recorded.",
      "Rollback steps written and tested.",
      "Post-change verification commands and success criteria defined."
     ]
    },
    {
     "type": "scenario",
     "situation": "During an outage at a Gazipur factory, an AI-assisted tool summarises the logs and suggests that an STP root change caused the problem. It proposes a command to set a new root priority on the core switch. Production is down and the plant manager is pressing for action. What should the engineer do?",
     "options": [
      {
       "text": "Quickly verify the claim with show commands (STP root, topology change counts, logs), then apply a reviewed fix through the emergency change process.",
       "feedback": "Correct. Emergency pressure shortens the process but does not remove verification. A wrong change during an outage can make it worse.",
       "best": true
      },
      {
       "text": "Apply the command immediately because the tool analysed all the logs.",
       "feedback": "The summary may be right, but unverified changes during an outage can deepen it and confuse the root cause.",
       "best": false
      },
      {
       "text": "Ignore the tool and reload the core switch.",
       "feedback": "A reload discards evidence and may cause another spanning-tree reconvergence.",
       "best": false
      },
      {
       "text": "Wait until the next scheduled change window.",
       "feedback": "The plant is down; an emergency change process exists for exactly this situation.",
       "best": false
      }
     ],
     "title": "The confident suggestion"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "In intent-based networking, what does the assurance stage do?",
       "options": [
        "Continuously checks that the network behaves as intended",
        "Converts business language into device configuration",
        "Pushes the generated configuration out to every relevant device",
        "Writes the business intent for the organisation"
       ],
       "answer": 0,
       "explain": "Assurance uses telemetry to verify ongoing compliance with intent. Translation converts intent to policy, activation pushes it, and the business — not the system — defines the intent."
      },
      {
       "q": "An assistant drafts an ACL line that is syntactically valid. What must the engineer still check?",
       "options": [
        "Only that the line has a sequence number",
        "Only that the device CLI accepts the command without errors",
        "Nothing further if the tool is approved",
        "That it matches the written policy and test results"
       ],
       "answer": 3,
       "explain": "Valid syntax can still violate intent, as with an overly broad `any`. Sequence numbers and CLI acceptance are trivial checks, and tool approval does not remove engineer accountability."
      },
      {
       "q": "Which credential model is safest for a new AI-assisted monitoring agent?",
       "options": [
        "Read-only access, with changes needing human approval",
        "Full admin rights so it can fix issues quickly",
        "The shared break-glass account for convenience",
        "No authentication on a trusted management VLAN"
       ],
       "answer": 0,
       "explain": "Least privilege limits damage from wrong suggestions or compromise. Full admin rights, sharing break-glass credentials or skipping authentication all enlarge the blast radius."
      },
      {
       "q": "What is the main risk of relying on an automated log summary during an incident?",
       "options": [
        "Summaries always take longer than reading logs",
        "Key details may be summarised away or misinterpreted",
        "Logs cannot be summarised by software",
        "Summaries delete the original log entries from the server"
       ],
       "answer": 1,
       "explain": "A summary can omit or distort the crucial event, so engineers confirm key evidence. Summaries are usually faster, are technically feasible, and do not delete source logs."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l5",
   "title": "The Whole Packet Journey, the Capstone and Exam Readiness",
   "subtitle": "Follow one packet through all eight stages, then prepare to prove your skills.",
   "minutes": 35,
   "objectives": [
    "Trace a single user request through all eight stages of the ZCNA Packet Journey.",
    "Use the journey as a structured troubleshooting method.",
    "Plan the ZCNA capstone and a personal exam-readiness strategy."
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Eight modules ago the journey started with a signal on a wire. Now you can follow a real request end to end — and, more importantly, you can use that path as a **troubleshooting map**. When something fails, ask \"how far did the packet get?\" and test each stage in order instead of guessing."
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "WIRE",
       "title": "Wire",
       "text": "Physical media, Ethernet framing, link up and error-free."
      },
      {
       "label": "ADDR",
       "title": "Address",
       "text": "Correct IPv4/IPv6 address, mask or prefix, and gateway."
      },
      {
       "label": "SW",
       "title": "Switch",
       "text": "Right VLAN, trunks carrying it, loop-free STP path, bundled links."
      },
      {
       "label": "RTE",
       "title": "Route",
       "text": "Routes exist to the destination and back; gateway redundancy works."
      },
      {
       "label": "SRV",
       "title": "Serve",
       "text": "DHCP, DNS, NAT, NTP, logging and QoS do their jobs."
      },
      {
       "label": "AIR",
       "title": "Air",
       "text": "RF, association, roaming and wireless security succeed."
      },
      {
       "label": "GRD",
       "title": "Guard",
       "text": "ACLs, port security, snooping, firewalls and VPNs allow what policy allows."
      },
      {
       "label": "AUTO",
       "title": "Automate",
       "text": "Configuration came from a reviewed source of truth and is monitored."
      }
     ],
     "title": "The ZCNA Packet Journey"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Air",
       "text": "Laptop finds SSID Branch-Staff on 5 GHz, completes WPA3-Enterprise with 802.1X and lands in VLAN 10"
      },
      {
       "label": "Serve: DHCP",
       "text": "DORA through the router's helper address; gets 192.168.10.37, gateway .1 and DNS"
      },
      {
       "label": "Switch",
       "text": "AP trunk tags VLAN 10; access switch forwards to the router; DHCP snooping and DAI check the bindings"
      },
      {
       "label": "Serve: DNS",
       "text": "Resolver returns the portal's address; ARP finds the gateway MAC"
      },
      {
       "label": "Guard + Route",
       "text": "Inbound ACL permits HTTPS to the portal; OSPF or a static default route sends it to the edge"
      },
      {
       "label": "Serve: NAT + QoS",
       "text": "PAT rewrites the source to 203.0.113.1; the policy queues it as business data"
      },
      {
       "label": "Reply and record",
       "text": "Return traffic is un-translated and delivered; NTP-stamped logs and telemetry record the session"
      }
     ],
     "title": "Nadia opens the bank portal from a Sylhet branch laptop"
    },
    {
     "type": "table",
     "head": [
      "Symptom",
      "Stage to suspect",
      "First checks"
     ],
     "rows": [
      [
       "Link light off, interface down/down",
       "Wire",
       "Cable, transceiver, `show interfaces status`"
      ],
      [
       "169.254.x.x address",
       "Serve (DHCP) or Switch",
       "Access VLAN, trunk, `ip helper-address`, scope"
      ],
      [
       "Can ping gateway but not remote subnet",
       "Route",
       "`show ip route`, return route, OSPF neighbours"
      ],
      [
       "Can reach IPs but not names",
       "Serve (DNS)",
       "Client DNS server, `nslookup`/`dig`, ACL on UDP/TCP 53"
      ],
      [
       "Inside works, Internet fails",
       "Serve (NAT) or Route",
       "`show ip nat statistics`, default route"
      ],
      [
       "Wi-Fi connects then drops when walking",
       "Air",
       "Signal at cell edge, roaming settings, 802.11r"
      ],
      [
       "One application blocked, others fine",
       "Guard",
       "`show access-lists` hit counters, firewall logs"
      ],
      [
       "Same fault on many sites after a change",
       "Automate",
       "Recent commits, template diff, rollback"
      ]
     ],
     "title": "Journey-based troubleshooting"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "For a single user, follow the packet path from their device outward. For a whole-site outage, start at the shared dependencies (WAN, core, DHCP, DNS). For a fault right after a change, start with what changed. The journey gives you the checklist either way.",
     "title": "Bottom-up, top-down or follow the path"
    },
    {
     "type": "scenario",
     "situation": "A new Wi-Fi 6E AP was installed in a Barishal branch meeting room on Monday. It bridges the Branch-Staff SSID to VLAN 10 locally. Laptops associate and pass WPA3-Enterprise authentication, but then show 169.254.x.x addresses. Wired PCs in VLAN 10 on the same switch work normally. The AP's switch port shows `switchport mode trunk`, `switchport trunk native vlan 99` and `switchport trunk allowed vlan 30,99`. What is the most likely cause?",
     "options": [
      {
       "text": "VLAN 10 is missing from the trunk's allowed list, so wireless clients' DHCP broadcasts never reach the wired VLAN.",
       "feedback": "Correct. Air and authentication succeed, and DHCP works for wired VLAN 10, so the break is at the Switch stage on the AP's trunk: add VLAN 10 to the allowed list.",
       "best": true
      },
      {
       "text": "The 6 GHz SSID must use WPA2 instead of WPA3.",
       "feedback": "6 GHz requires WPA3 or OWE, and the clients have already authenticated successfully.",
       "best": false
      },
      {
       "text": "The router needs an `ip helper-address` for VLAN 10.",
       "feedback": "Wired PCs in VLAN 10 already get addresses, so the relay for VLAN 10 is working.",
       "best": false
      },
      {
       "text": "The AP's transmit power is too low for the meeting room.",
       "feedback": "The laptops associate and authenticate, so RF is not what stops them getting an address.",
       "best": false
      }
     ],
     "title": "Integrated troubleshooting"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Design",
       "text": "Address plan (IPv4 and IPv6), VLANs for staff, voice, guest and management, and a diagram."
      },
      {
       "title": "Switch and route",
       "text": "Access and distribution switching with trunks, STP and EtherChannel; OSPF to head office with a default route and gateway redundancy."
      },
      {
       "title": "Serve",
       "text": "DHCP with relay, DNS, PAT to the Internet, NTP, syslog, SNMPv3, SSH-only management and a WAN QoS policy."
      },
      {
       "title": "Air",
       "text": "A two-AP WLAN with staff (WPA3) and guest SSIDs, a channel plan and a short survey record."
      },
      {
       "title": "Guard",
       "text": "Hardened devices, AAA with fallback, ACLs for guest and teller policies, port security, DHCP snooping and DAI."
      },
      {
       "title": "Automate",
       "text": "A YAML inventory, one template and one playbook or script that audits the baseline."
      },
      {
       "title": "Prove it",
       "text": "Verification evidence for every stage: show outputs, test results and a one-page journey walk-through."
      }
     ],
     "title": "The ZCNA capstone: build the Barishal branch"
    },
    {
     "type": "template",
     "title": "Capstone evidence log",
     "purpose": "Collect proof for each stage as you build, so your final submission is a record, not a reconstruction.",
     "columns": [
      "Stage",
      "Requirement",
      "Verification command / test",
      "Result",
      "Screenshot or file"
     ],
     "example": [
      [
       "Serve",
       "Guest VLAN gets DHCP via relay",
       "`show ip dhcp binding` on server; client `ipconfig`/`ip addr`",
       "Pass — 192.168.30.21",
       "serve-dhcp-01.txt"
      ],
      [
       "Guard",
       "Guest cannot reach 10.0.0.0/8",
       "Ping 10.0.50.11 from guest; `show access-lists GUEST-IN`",
       "Pass — line 20 matches",
       "guard-acl-02.txt"
      ]
     ],
     "rows": 8
    },
    {
     "type": "keypoints",
     "items": [
      "**Read the last sentence first** — know whether it asks for the *first*, *best*, *most likely* or *incorrect* option before reading the story.",
      "**Find the stage**: decide which part of the Packet Journey the scenario is really about.",
      "**Read outputs carefully**: interface state, hit counters, \"stratum 16\", `169.254` — the evidence usually points at one answer.",
      "**Eliminate** options that are technically false, then those that are true but do not solve this problem.",
      "**Manage time**: mark long questions, move on, return later; never leave a question blank.",
      "**Practise in a lab**: configure and break things yourself; commands you have typed are commands you remember.",
      "**Check the current ZCNA exam guide** for format, duration and any lab components before you book."
     ],
     "title": "Exam strategy that works"
    },
    {
     "type": "checklist",
     "title": "Exam-readiness checklist",
     "items": [
      "I can subnet an IPv4 /24 into any prefix in under two minutes and read IPv6 prefixes confidently.",
      "I can configure VLANs, trunks and a basic EtherChannel from memory and verify STP root.",
      "I can configure OSPFv2 single-area and static routes, and read a routing table.",
      "I can configure DHCP relay, PAT and an SSH-only management baseline.",
      "I can write and place standard and extended ACLs with correct wildcard masks.",
      "I can explain WPA2 vs WPA3 and personal vs enterprise, and 802.1X roles.",
      "I can read JSON and YAML and explain REST verbs and status codes.",
      "I have completed the capstone with verification evidence for every stage.",
      "I have taken at least two timed practice exams and reviewed every wrong answer."
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Data plane",
       "def": "The part of a device that forwards packets and frames."
      },
      {
       "term": "Control plane",
       "def": "The part of a device that builds forwarding decisions, using protocols such as OSPF, STP and ARP."
      },
      {
       "term": "Management plane",
       "def": "How engineers and tools configure and monitor a device: SSH, SNMP, APIs."
      },
      {
       "term": "SDN controller",
       "def": "Software that holds the network-wide view and programs devices through APIs."
      },
      {
       "term": "Northbound API",
       "def": "The interface applications use to talk to a controller, usually REST with JSON."
      },
      {
       "term": "Southbound interface",
       "def": "How a controller talks to devices: NETCONF, RESTCONF, gNMI, OpenFlow or CLI."
      },
      {
       "term": "REST API",
       "def": "An HTTP-based interface where resources have URLs and verbs such as GET and POST act on them."
      },
      {
       "term": "JSON",
       "def": "A text data format of objects, arrays, strings, numbers, booleans and null, with double-quoted strings."
      },
      {
       "term": "YAML",
       "def": "A human-friendly data format where indentation defines structure; used by Ansible."
      },
      {
       "term": "YANG",
       "def": "A data-modelling language that describes device configuration and state for NETCONF and RESTCONF."
      },
      {
       "term": "Idempotency",
       "def": "The property that repeating an operation leaves the system in the same final state."
      },
      {
       "term": "Source of truth",
       "def": "The authoritative, version-controlled record of how the network should be."
      },
      {
       "term": "Intent-based networking",
       "def": "Defining desired outcomes and letting the system translate, apply and continuously assure them."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Look back at the eight stages of the ZCNA Packet Journey. Which stage do you feel least confident troubleshooting today, and what two lab exercises will you do this week to fix that?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A user's laptop has a valid address and can ping its gateway but not a server in another subnet. Which stage do you investigate first?",
       "options": [
        "Wire — cable and transceiver",
        "Air — channel and signal",
        "Serve — DHCP scope options for the user's VLAN",
        "Route — routes to the destination and back"
       ],
       "answer": 3,
       "explain": "Reaching the gateway proves the wire, address and wireless access work, so the next stage is routing. DHCP has already succeeded."
      },
      {
       "q": "Many branches fail in the same way within minutes of a change window. Where should troubleshooting start?",
       "options": [
        "With each branch's physical cabling, optics and patch panels",
        "With the RF channel plan at each site",
        "With the change that was just automated to those sites",
        "With the clients' operating systems"
       ],
       "answer": 2,
       "explain": "A simultaneous fault across sites after a change points to the change itself — check the commit and diff, and roll back if needed. Cabling, RF and client OS problems would not appear everywhere at once."
      },
      {
       "q": "Clients can reach websites by IP address but not by name. Which stage is most likely failing?",
       "options": [
        "Switch, at the trunk",
        "Route, at OSPF",
        "Serve, at the DNS service",
        "Wire, at the physical link"
       ],
       "answer": 2,
       "explain": "IP reachability proves layers below DNS work; name resolution is the failing service. A trunk, routing or link fault would also break access by IP."
      },
      {
       "q": "In an exam question asking for the FIRST action, which option is usually best?",
       "options": [
        "The safe step that gathers evidence about the likely stage",
        "The most expensive hardware replacement",
        "A reload of every device in the path",
        "The longest and most detailed configuration change"
       ],
       "answer": 0,
       "explain": "\"First\" questions reward evidence-based, low-risk steps. Replacing hardware, reloading devices or making large changes come later, if at all."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.exam.push([
 {
  "module": "m5",
  "q": "PCs in a new VLAN 60 (192.168.60.0/24) receive 169.254.x.x addresses. The router subinterface Gi0/1.60 has `ip address 192.168.60.1 255.255.255.0` and `ip helper-address 10.0.50.10`. The DHCP server at 10.0.50.10 shows no Discover packets arriving from 192.168.60.0/24 scope. Other VLANs work. What should you check next?",
  "options": [
   "Whether the DHCP server's lease time is longer than seven days",
   "Whether the router has `no ip domain-lookup` configured globally",
   "Whether VLAN 60 is allowed on the switch-to-router trunk",
   "Whether the PCs have the correct DNS suffix configured locally"
  ],
  "answer": 2,
  "explain": "The relay is configured but the server sees nothing, so the broadcasts are probably not reaching the router — a missing VLAN on the trunk is the classic cause. Lease time and DNS suffix do not stop a Discover reaching the server, and `no ip domain-lookup` only affects how the router resolves names."
 },
 {
  "module": "m5",
  "q": "Users on 192.168.10.0/24 browse the Internet, but users on the newly added 192.168.11.0/24 cannot. Both subnets reach internal servers.",
  "options": [
   "The outside interface is configured with `ip nat inside` instead of outside",
   "The NAT ACL does not match the new 192.168.11.0/24 subnet",
   "The default route points to the wrong next hop at the ISP side",
   "The DNS server is not resolving names for the new subnet's users"
  ],
  "answer": 1,
  "explain": "Because the original subnet still reaches the Internet, the NAT roles and default route must be working. The only per-subnet NAT element is the ACL in `ip nat inside source list`. A DNS failure would also affect access by IP, and the question says browsing fails only for the new subnet."
 },
 {
  "module": "m5",
  "q": "Output from an edge router:\n`Pro Inside global     Inside local        Outside local      Outside global`\n`tcp 203.0.113.1:4096 192.168.1.50:51000  198.51.100.9:443   198.51.100.9:443`\nWhich address will the web server 198.51.100.9 see as the source of the connection?",
  "options": [
   "192.168.1.50, port 51000",
   "198.51.100.9, port 443",
   "203.0.113.1, port 51000",
   "203.0.113.1, port 4096"
  ],
  "answer": 3,
  "explain": "The inside global address and port are what outside hosts see after PAT. 192.168.1.50:51000 is the private inside local address, 198.51.100.9:443 is the server itself, and the translated port in the table is 4096, not 51000."
 },
 {
  "module": "m5",
  "q": "An engineer configures `logging trap informational` on a router. Which messages will be sent to the syslog server?",
  "options": [
   "Severity levels 0 through 6",
   "Severity level 6 only",
   "Severity levels 6 and 7",
   "Severity levels 0 through 7"
  ],
  "answer": 0,
  "explain": "A configured level sends that level and every more severe (lower-numbered) level: 0–6. It is not limited to one level, and level 7 (debugging) is excluded because it is less severe than informational."
 },
 {
  "module": "m5",
  "q": "`show ntp status` on a switch reports `Clock is unsynchronized, stratum 16, no reference clock`. The configured NTP server is reachable by ping. What is the most likely cause?",
  "options": [
   "UDP 123 is blocked or the server itself is unsynchronised",
   "The switch needs SNMPv3 enabled before NTP will start",
   "The switch's syslog level is set too high to accept time",
   "The DHCP scope does not include an NTP option for switches"
  ],
  "answer": 0,
  "explain": "Ping proves IP reachability but not that UDP 123 is permitted or that the server has valid time to give. NTP does not depend on SNMP or syslog settings, and a switch with a configured `ntp server` does not need a DHCP option."
 },
 {
  "module": "m5",
  "q": "A security audit finds `snmp-server community public RO` on 80 switches. Monitoring must continue. What is the best remediation?",
  "options": [
   "Rename the community string to `private` on every switch",
   "Use SNMPv3 authPriv users and remove the community",
   "Change the community from RO to RW for better control",
   "Move SNMP polling from UDP 161 to UDP 162 on all switches"
  ],
  "answer": 1,
  "explain": "SNMPv3 with authentication and encryption fixes the clear-text, guessable credential. `private` is equally guessable, RW adds write risk, and port 162 is for traps rather than polling."
 },
 {
  "module": "m5",
  "q": "Voice calls across a branch's 100 Mbps WAN break up during large file uploads. Phones mark EF, and the WAN router has a policy with `priority percent 20` for EF applied **inbound** on the WAN interface. What should be changed?",
  "options": [
   "Remark voice traffic from EF to AF41 on the LAN",
   "Apply the queuing policy inbound on every LAN port",
   "Apply the queuing policy outbound on the WAN interface",
   "Raise the voice priority queue from 20 to 100 percent"
  ],
  "answer": 2,
  "explain": "Congestion happens when packets leave the slower WAN interface, so queuing must be applied outbound there. Remarking voice to AF41 removes priority, LAN inbound policies cannot schedule the WAN, and a 100% priority queue could starve all other traffic."
 },
 {
  "module": "m5",
  "q": "A remote router must be upgraded across the Internet. Which approach best protects the image and the session?",
  "options": [
   "Copy the image with TFTP and check its file size afterwards",
   "Copy the image with FTP using a long, complex password",
   "Copy the image over Telnet after enabling privilege level 15",
   "Copy it by SCP and verify its hash before booting"
  ],
  "answer": 3,
  "explain": "SCP authenticates and encrypts, and a hash comparison proves integrity. TFTP has no authentication or encryption and file size does not prove integrity, FTP exposes credentials in clear text, and Telnet is unencrypted."
 },
 {
  "module": "m6",
  "q": "A survey reading shows signal −74 dBm and noise −90 dBm at a reception desk where staff make Wi-Fi calls. What does this mean for voice?",
  "options": [
   "SNR is 164 dB, far above the voice target",
   "SNR is 16 dB, comfortably above the voice target",
   "SNR is −16 dB, so the reading must be invalid",
   "SNR is 16 dB, below the usual voice target"
  ],
  "answer": 3,
  "explain": "SNR = −74 − (−90) = 16 dB. Voice designs typically aim for about 25 dB with −67 dBm or better, so this is too low. Adding magnitudes gives the meaningless 164, and subtracting in reverse gives a negative value."
 },
 {
  "module": "m6",
  "q": "A small office has three APs. Their 2.4 GHz radios are on channels 1, 4 and 8. Users report slow 2.4 GHz performance. What should be done?",
  "options": [
   "Move all three radios to channel 6 together",
   "Re-plan the radios to channels 1, 6 and 11",
   "Widen the 2.4 GHz channels to 40 MHz each",
   "Increase each 2.4 GHz radio to maximum power"
  ],
  "answer": 1,
  "explain": "Channels 1, 4 and 8 overlap, causing adjacent-channel interference; 1, 6 and 11 do not. One shared channel adds contention, 40 MHz in 2.4 GHz consumes most of the band, and more power increases interference."
 },
 {
  "module": "m6",
  "q": "A Wi-Fi 6E AP broadcasts an SSID on 6 GHz. An engineer tries to set the SSID to WPA2-Personal for compatibility, but the 6 GHz radio refuses to enable it. Why?",
  "options": [
   "6 GHz operation requires WPA3 or Enhanced Open with PMF",
   "6 GHz radios can broadcast only hidden SSIDs by default",
   "WPA2 requires 802.3bt power to run at 6 GHz",
   "WPA2 works at 6 GHz only with 20 MHz channels"
  ],
  "answer": 0,
  "explain": "Rules for 6 GHz exclude WPA2 and legacy security, requiring WPA3 or OWE with protected management frames. Hidden SSIDs, PoE class and channel width are unrelated to the security mode allowed."
 },
 {
  "module": "m6",
  "q": "Lightweight APs at a branch cannot join the controller in head office. A firewall between them permits SSH, HTTPS and SNMP. What should be permitted?",
  "options": [
   "RADIUS on UDP 1812 and 1813",
   "IPsec IKE on UDP 500 and 4500",
   "CAPWAP on UDP 5246 and 5247",
   "Syslog on UDP 514 and 162"
  ],
  "answer": 2,
  "explain": "Lightweight APs use CAPWAP control (5246) and data (5247) to reach the controller. RADIUS is for client authentication, IKE is for VPN negotiation, and syslog and SNMP traps are monitoring traffic."
 },
 {
  "module": "m6",
  "q": "Clients using an 802.1X SSID experience two-second gaps in calls each time they move between APs on the same VLAN. Coverage overlap meets the design. Which feature most directly addresses this?",
  "options": [
   "802.11d country information",
   "802.11h dynamic frequency selection",
   "802.11r fast BSS transition",
   "802.11w protected management frames"
  ],
  "answer": 2,
  "explain": "802.11r pre-derives keys so the client avoids a full 802.1X exchange on each roam. 802.11d advertises regulatory domain, 802.11h handles DFS and power control, and 802.11w protects management frames."
 },
 {
  "module": "m6",
  "q": "A 60-person company still uses one WPA2-Personal passphrase that several former employees know. Management wants per-user control and the ability to remove individuals instantly. What should be deployed?",
  "options": [
   "WPA3-Enterprise with 802.1X and a RADIUS server",
   "WPA3-Personal with a new shared passphrase",
   "WPA2-Personal with MAC address filtering added",
   "An open SSID with the network name hidden"
  ],
  "answer": 0,
  "explain": "Enterprise mode gives each user their own credential, so access can be revoked individually. A new shared passphrase still leaks with the next leaver, MAC filtering is easily bypassed, and a hidden open SSID is not access control."
 },
 {
  "module": "m6",
  "q": "A new AP installed on an 802.3af switch port boots, but its management page shows one radio disabled and USB power off. The design specifies 802.3at. What is the likely cause?",
  "options": [
   "The trunk to the AP is missing the guest VLAN on this port",
   "The port cannot supply enough power for the AP",
   "The AP's country code is wrong and is blocking one radio",
   "The SSID uses WPA3 and the AP needs firmware for WPA2"
  ],
  "answer": 1,
  "explain": "802.3af supplies up to 15.4 W, so a PoE+ AP falls back to a reduced-power mode. A missing VLAN affects traffic, not radio power state; a wrong country code changes allowed channels, and security mode does not disable hardware."
 },
 {
  "module": "m7",
  "q": "An engineer applies `ip access-group 110 in` on the LAN interface. ACL 110 contains only `deny tcp 192.168.5.0 0.0.0.255 any eq 23`. Shortly afterwards, every user on that LAN loses all connectivity. Why?",
  "options": [
   "Telnet blocking automatically blocks all TCP traffic on the interface",
   "Extended ACLs must always be applied outbound to work correctly",
   "ACL numbers between 100 and 199 are reserved for standard ACLs",
   "The implicit deny drops everything not explicitly permitted"
  ],
  "answer": 3,
  "explain": "With no permit statement, the implicit deny drops everything. Denying TCP 23 does not affect other ports, extended ACLs work in either direction, and 100–199 is the extended range."
 },
 {
  "module": "m7",
  "q": "Which wildcard mask matches only hosts in 10.10.8.0/22?",
  "options": [
   "0.0.3.255",
   "0.0.7.255",
   "255.255.252.0",
   "0.0.1.255"
  ],
  "answer": 0,
  "explain": "A /22 mask is 255.255.252.0; subtracting it from 255.255.255.255 gives 0.0.3.255. 0.0.7.255 is a /21, 255.255.252.0 is the subnet mask itself, and 0.0.1.255 is a /23."
 },
 {
  "module": "m7",
  "q": "A router has:\n`ip access-list standard MGMT`\n` permit 10.0.99.0 0.0.0.255`\n`interface Gi0/0`\n` ip access-group MGMT in`\nEngineers from 10.0.99.0/24 can still SSH to the router, but so can users in 192.168.20.0/24 who reach it through Gi0/2. What should be done?",
  "options": [
   "Convert the ACL to an extended ACL applied outbound on Gi0/0",
   "Add `deny any` before the permit statement in the ACL",
   "Apply the ACL to the VTY lines with `access-class MGMT in`",
   "Apply the ACL to Gi0/0 outbound instead of inbound"
  ],
  "answer": 2,
  "explain": "Restricting management sessions to the router is done on the VTY lines with `access-class`, which covers every interface. Interface ACLs only filter traffic on that interface, and placing `deny any` first would block the engineers too."
 },
 {
  "module": "m7",
  "q": "Users on VLAN 20 suddenly receive the default gateway 192.168.20.254 from an unknown DHCP server. Which switch feature prevents this?",
  "options": [
   "Dynamic ARP inspection with the uplink trusted",
   "Port security with sticky MAC addresses",
   "Spanning tree root guard on the uplink",
   "DHCP snooping with only the uplink trusted"
  ],
  "answer": 3,
  "explain": "DHCP snooping drops server messages (Offer, Ack) arriving on untrusted ports, silencing a rogue server. DAI validates ARP, port security limits MAC addresses, and root guard protects STP — none filter DHCP offers."
 },
 {
  "module": "m7",
  "q": "After enabling dynamic ARP inspection on VLAN 30, DHCP clients work, but a printer with a static IP address cannot be reached. What is the best fix?",
  "options": [
   "Disable DHCP snooping on VLAN 30 permanently",
   "Permit the printer's IP and MAC with an ARP ACL for DAI",
   "Trust every access port in VLAN 30 for DAI",
   "Enable port security on the printer's port"
  ],
  "answer": 1,
  "explain": "Static hosts have no DHCP snooping binding, so DAI needs an ARP ACL entry for them. Disabling snooping breaks DAI, trusting every port removes protection, and port security does not affect ARP validation."
 },
 {
  "module": "m7",
  "q": "`show interfaces status err-disabled` lists Gi0/9 with reason `psecure-violation`. The port has `switchport port-security maximum 1` and a sticky MAC. A user connected a small unmanaged switch with two PCs. What is the correct sequence?",
  "options": [
   "Raise the maximum to 50 and leave the switch connected",
   "Re-enable the port first, then investigate the violation",
   "Disable port security on every access port in the whole building",
   "Remove the unmanaged switch, then shut and re-enable the port"
  ],
  "answer": 3,
  "explain": "Remove the cause first, then recover the port with shutdown/no shutdown. Raising the limit legitimises an unauthorised device, re-enabling first simply triggers another violation, and disabling port security removes the control everywhere."
 },
 {
  "module": "m7",
  "q": "A company wants engineers' router logins authorised per command and every configuration command recorded centrally. Which choice fits best?",
  "options": [
   "RADIUS with a shared password for all engineers",
   "Local accounts on each router with type 7 passwords",
   "TACACS+ with command authorisation and accounting",
   "SNMPv3 users with authPriv on every router"
  ],
  "answer": 2,
  "explain": "TACACS+ separates authorisation and supports per-command authorisation and command accounting. RADIUS lacks per-command control and a shared password removes accountability, local type 7 passwords are weak and not central, and SNMP is not a login protocol."
 },
 {
  "module": "m7",
  "q": "A site-to-site IPsec tunnel to a branch behind an ISP's NAT device fails to pass data, although IKE negotiation completes. Which traffic must the path permit?",
  "options": [
   "IP protocol 51 for AH encryption",
   "UDP 4500 for NAT traversal of ESP",
   "TCP 49 for the IKE key exchange messages",
   "UDP 1812 for IPsec key exchange"
  ],
  "answer": 1,
  "explain": "When NAT is detected, ESP is encapsulated in UDP 4500. AH (protocol 51) provides no encryption and does not survive NAT, TCP 49 is TACACS+, and UDP 1812 is RADIUS."
 },
 {
  "module": "m8",
  "q": "A script sends a request to the controller to add a new site and receives `201 Created`. Which HTTP verb did it most likely use?",
  "options": [
   "POST",
   "GET",
   "DELETE",
   "HEAD"
  ],
  "answer": 0,
  "explain": "POST creates a new resource, and 201 confirms creation. GET reads, DELETE removes, and HEAD retrieves headers only."
 },
 {
  "module": "m8",
  "q": "A playbook run reports:\n`r1 : ok=3 changed=0`\n`r2 : ok=3 changed=2`\nThe same playbook is immediately run again with no other changes. What should a well-written, idempotent playbook report for r2?",
  "options": [
   "changed=2, because the same tasks run again",
   "failed=2, because the lines already exist",
   "changed=0, because r2 now matches the desired state",
   "unreachable=1, because the device is locked"
  ],
  "answer": 2,
  "explain": "Idempotent tasks change nothing when the device already matches. Reporting changed again would indicate a non-idempotent task, existing lines are not failures, and nothing suggests the device is unreachable."
 },
 {
  "module": "m8",
  "q": "Which YAML snippet correctly defines a list of two VLAN IDs under the key `vlans`?",
  "options": [
   "`vlans:` followed by indented lines `- 10` and `- 20`",
   "`vlans:` followed by tab-indented lines `- 10` and `- 20`",
   "`vlans = (10; 20)` on one line with parentheses",
   "`vlans:` followed by unindented lines `10,` and `20,`"
  ],
  "answer": 0,
  "explain": "YAML lists use a dash and space under an indented key. Tabs are not allowed for indentation, the parenthesis form is not YAML, and unindented values with commas are not list items."
 },
 {
  "module": "m8",
  "q": "In a controller-based architecture, an IT service-management platform asks the controller to apply a QoS policy to 40 sites. Which interface carries this request?",
  "options": [
   "The southbound NETCONF session to each switch",
   "The northbound REST API of the controller",
   "The data plane of the WAN routers",
   "The console port of the controller"
  ],
  "answer": 1,
  "explain": "Applications talk to the controller through its northbound API. Southbound interfaces connect controller to devices, the data plane forwards user traffic, and the console is a local management port."
 },
 {
  "module": "m8",
  "q": "A RESTCONF GET to a router returns `401 Unauthorized`. The URL and model name were copied from working documentation. What should be checked first?",
  "options": [
   "Whether the JSON body has a trailing comma in it",
   "Whether the YANG model exists on the router at all",
   "Whether the router's NTP server is reachable now",
   "The credentials or token sent with the request"
  ],
  "answer": 3,
  "explain": "401 means authentication failed. A GET normally has no body, a missing model would give 404 or a similar error, and NTP problems do not cause authentication rejections in this way."
 },
 {
  "module": "m8",
  "q": "An AI-assisted tool suggests a command to fix a routing loop during an outage. The engineer has never seen the command before. What should happen first?",
  "options": [
   "Apply it immediately because outages need fast action",
   "Verify the command and diagnosis against evidence",
   "Apply it to all routers so the network stays consistent",
   "Reload the router so the command takes effect cleanly"
  ],
  "answer": 1,
  "explain": "Suggestions are proposals; unfamiliar commands must be verified, even in an emergency, because a wrong change can deepen the outage. Applying widely, applying blindly or reloading all skip verification and add risk."
 },
 {
  "module": "m8",
  "q": "Laptops on the staff SSID get valid addresses and can resolve names, but cannot open the Internet; wired PCs on the same VLAN can. Using the Packet Journey, which stage should you examine first?",
  "options": [
   "Guard — an ACL or policy applied to wireless traffic",
   "Wire — the physical cable to the laptops",
   "Address — the DHCP scope for the VLAN",
   "Route — the default route on the edge"
  ],
  "answer": 0,
  "explain": "Addressing and DNS work and wired users on the same VLAN reach the Internet, so routing and NAT are fine; the difference is a wireless-specific policy. Laptops have no cable, and the scope already works."
 }
]);
