window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.modules.push({
 "id": "m1",
 "order": 1,
 "code": "Wire",
 "title": "Network Fundamentals",
 "subtitle": "Models, Ethernet, media, topologies and transport — the first stage of every packet's journey",
 "outcomes": [
  "Explain what networks do and use the eight-stage ZCNA Packet Journey to reason about problems",
  "Map OSI and TCP/IP layers, describe encapsulation and name each PDU",
  "Describe Ethernet frames, MAC addresses, duplex, cabling choices and PoE budgets",
  "Compare campus, data-centre, WAN, SOHO and cloud topologies",
  "Contrast TCP and UDP and use ping, traceroute, ipconfig/ip and arp to isolate faults"
 ],
 "lessons": [
  {
   "id": "m1-l1",
   "title": "What Networks Do — and the ZCNA Packet Journey",
   "subtitle": "Devices, roles and the eight-stage story every packet follows",
   "minutes": 22,
   "objectives": [
    "Explain what a network does in terms of connectivity, sharing and services",
    "Identify the job of hosts, switches, routers, access points and firewalls",
    "Describe the eight stages of the ZCNA Packet Journey",
    "Distinguish a LAN, a WAN and a cloud network"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Open a banking app in Dhaka, join a video class from Sylhet or scan a parcel in a Chattogram warehouse and the same thing happens underneath: your device chops information into small units, labels them with addresses, and hands them to a chain of devices that carry them — often across several countries — to the right destination and back again, in milliseconds. That chain of devices, cables, radio links and rules is a **network**. This course teaches you to design, build, verify and fix the most common parts of it."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "A **computer network** is a set of devices connected by wired or wireless links that follow shared rules (**protocols**) so they can exchange data and share resources such as internet access, files, printers and applications.",
     "title": "Network"
    },
    {
     "type": "table",
     "head": [
      "Device",
      "Main job",
      "Works mostly with",
      "Everyday example"
     ],
     "rows": [
      [
       "Host / endpoint",
       "Creates and consumes data",
       "Applications, IP addresses",
       "Laptop, phone, server, IP camera"
      ],
      [
       "Switch",
       "Connects devices inside one LAN and forwards frames",
       "MAC addresses",
       "48-port switch in a floor wiring cabinet"
      ],
      [
       "Router",
       "Connects different networks and chooses paths",
       "IP addresses, routing table",
       "Branch router linking an office to the internet"
      ],
      [
       "Wireless access point",
       "Bridges Wi-Fi clients onto the wired LAN",
       "Radio + MAC addresses",
       "Ceiling AP in a classroom"
      ],
      [
       "Firewall",
       "Allows or blocks traffic according to policy",
       "Addresses, ports, sessions",
       "Edge firewall in front of a data centre"
      ],
      [
       "Controller / cloud dashboard",
       "Configures and monitors many devices centrally",
       "APIs, policies",
       "Wireless or SD-WAN controller"
      ]
     ],
     "title": "Who does what in a typical network"
    },
    {
     "type": "framework",
     "items": [
      {
       "label": "S1",
       "title": "Wire",
       "text": "Bits leave the device over copper, fibre or radio inside an Ethernet frame. Models, cables, speeds and transport protocols live here."
      },
      {
       "label": "S2",
       "title": "Address",
       "text": "Every interface needs a correct IPv4 and/or IPv6 address, mask or prefix, and gateway — or the journey never starts."
      },
      {
       "label": "S3",
       "title": "Switch",
       "text": "Inside the LAN, switches learn MAC addresses, separate traffic into VLANs and keep the topology loop-free."
      },
      {
       "label": "S4",
       "title": "Route",
       "text": "Routers compare the destination with their routing table and forward the packet hop by hop between networks."
      },
      {
       "label": "S5",
       "title": "Serve",
       "text": "Supporting services — DHCP, DNS, NAT, NTP, logging, QoS — make the journey automatic, named, translated and measurable."
      },
      {
       "label": "S6",
       "title": "Air",
       "text": "Wireless LANs carry the first or last hop for most users today, with their own rules for radio, roaming and security."
      },
      {
       "label": "S7",
       "title": "Guard",
       "text": "Security controls decide which packets are allowed, from which ports and users, and protect the devices themselves."
      },
      {
       "label": "S8",
       "title": "Automate",
       "text": "Controllers, APIs and scripts configure and check hundreds of devices consistently instead of one at a time."
      }
     ],
     "title": "The ZCNA Packet Journey — eight stages"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "When something breaks, ask *which stage failed?* A bad cable is a Wire problem; a wrong mask is an Address problem; a port in the wrong VLAN is a Switch problem; a missing route is a Route problem. Naming the stage narrows the search from \"the network is down\" to one layer of checks.",
     "title": "Use the Journey as a troubleshooting map"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Wire",
       "text": "The laptop's Wi-Fi radio sends frames to the access point, which puts them on a copper uplink."
      },
      {
       "label": "Address",
       "text": "The laptop already has 10.20.30.45/24 and gateway 10.20.30.1 from DHCP."
      },
      {
       "label": "Switch",
       "text": "Access and distribution switches forward the frame in the student VLAN toward the gateway MAC."
      },
      {
       "label": "Route",
       "text": "The gateway routes the packet toward the data-centre subnet that hosts the portal."
      },
      {
       "label": "Serve",
       "text": "DNS has already turned the portal name into an IP address."
      },
      {
       "label": "Guard",
       "text": "A firewall checks that students may reach TCP port 443 on the portal server."
      }
     ],
     "title": "A student opens the university portal"
    },
    {
     "type": "topology",
     "title": "The student portal path",
     "nodes": [
      {
       "id": "lap",
       "kind": "laptop",
       "label": "Student laptop",
       "sub": "10.20.30.45/24",
       "x": 0,
       "y": 4
      },
      {
       "id": "ap",
       "kind": "ap",
       "label": "Access point",
       "sub": "Ceiling AP",
       "x": 0,
       "y": 2
      },
      {
       "id": "as",
       "kind": "switch",
       "label": "Access switch",
       "sub": "Floor 2 closet",
       "x": 2,
       "y": 2
      },
      {
       "id": "ds",
       "kind": "l3switch",
       "label": "Distribution",
       "sub": "Gateway 10.20.30.1",
       "x": 4,
       "y": 2
      },
      {
       "id": "fw",
       "kind": "firewall",
       "label": "DC firewall",
       "sub": "Allows TCP 443",
       "x": 6,
       "y": 2
      },
      {
       "id": "srv",
       "kind": "server",
       "label": "Portal server",
       "sub": "10.50.0.10",
       "x": 6,
       "y": 4
      }
     ],
     "links": [
      {
       "a": "lap",
       "b": "ap",
       "label": "Wi-Fi",
       "style": "wireless"
      },
      {
       "a": "ap",
       "b": "as",
       "label": "2.5G PoE+"
      },
      {
       "a": "as",
       "b": "ds",
       "label": "10G uplink"
      },
      {
       "a": "ds",
       "b": "fw",
       "label": "10G"
      },
      {
       "a": "fw",
       "b": "srv",
       "label": "HTTPS"
      }
     ],
     "zones": [
      {
       "label": "Campus LAN",
       "x": 0,
       "y": 2,
       "w": 5,
       "h": 3,
       "tone": "neutral"
      },
      {
       "label": "Data centre",
       "x": 6,
       "y": 2,
       "w": 1,
       "h": 3,
       "tone": "accent"
      }
     ],
     "caption": "Follow the request from radio to copper to the gateway and through the firewall. Each hop belongs to a Journey stage, so when the portal fails you can ask which hop broke first."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "LAN (local area network)",
       "items": [
        "One building or campus",
        "Owned and run by the organisation",
        "Ethernet and Wi-Fi at 1–100 Gbps",
        "Switches and access points dominate"
       ]
      },
      {
       "title": "WAN (wide area network)",
       "items": [
        "Connects sites across cities or countries",
        "Usually rides on provider circuits or the internet",
        "Lower speed per cost, higher latency",
        "Routers, SD-WAN edges and VPNs dominate"
       ]
      },
      {
       "title": "Cloud network",
       "items": [
        "Virtual networks inside a provider's data centres",
        "Built from software objects: virtual networks, subnets, route tables, security groups",
        "Reached over VPN, private links or the internet",
        "Same IP ideas, different tools"
       ]
      }
     ],
     "title": "LAN, WAN and cloud network"
    },
    {
     "type": "keypoints",
     "items": [
      "**Connectivity** — any authorised device can reach the services it needs.",
      "**Performance** — enough bandwidth and low enough delay for voice, video and apps.",
      "**Availability** — no single cable, device or link failure should stop the business.",
      "**Security** — only the right users and devices reach the right resources.",
      "**Manageability** — engineers can see, change and verify the network quickly."
     ],
     "title": "What a well-run network delivers"
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ ip -br addr",
      "lo               UNKNOWN        127.0.0.1/8 ::1/128",
      "eth0             UP             10.20.30.45/24 fe80::5054:ff:fe1a:2b3c/64",
      "$ ip route",
      "default via 10.20.30.1 dev eth0 proto dhcp metric 100",
      "10.20.30.0/24 dev eth0 proto kernel scope link src 10.20.30.45 metric 100"
     ],
     "title": "A first look from a Linux host",
     "note": "Two commands already tell you three Journey facts: the host's address (Address), the link state UP (Wire) and the default gateway it will send off-subnet traffic to (Route)."
    },
    {
     "type": "scenario",
     "situation": "A teacher says: \"The internet is down in Room 204.\" Other rooms work. In Room 204 one laptop shows a valid address but cannot open any website; the projector PC in the same room shows a link light that is off.",
     "options": [
      {
       "text": "Restart the core router so every room gets a fresh start",
       "feedback": "Other rooms work, so the core is unlikely to be the cause — and restarting it would interrupt everyone.",
       "best": false
      },
      {
       "text": "Treat it as two separate problems: check the projector PC's cable and port (Wire) and the laptop's gateway and DNS (Address/Serve)",
       "feedback": "Correct. The symptoms point to different Journey stages. Splitting them avoids chasing one imaginary fault.",
       "best": true
      },
      {
       "text": "Call the internet provider because websites will not load",
       "feedback": "If other rooms reach the internet, the provider link is working; the fault is local to Room 204.",
       "best": false
      },
      {
       "text": "Replace the room's access point",
       "feedback": "Nothing points to Wi-Fi specifically; the projector PC is wired and the laptop already has an address.",
       "best": false
      }
     ],
     "title": "Where would you start?"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Even a rough sketch — devices, links, subnets, which port goes where — saves hours. Professionals keep an up-to-date diagram and an addressing plan for every site, and they update both after every change.",
     "title": "Draw before you type"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "A network moves data between devices using shared protocols; hosts, switches, routers, APs, firewalls and controllers each have one main job.",
      "The eight Packet Journey stages — Wire, Address, Switch, Route, Serve, Air, Guard, Automate — double as a troubleshooting map.",
      "When symptoms differ between devices, treat them as separate faults at separate stages.",
      "LANs, WANs and cloud networks use the same IP ideas; they differ in ownership, distance and tooling."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which device's main job is to forward packets **between different IP networks**?",
       "options": [
        "Access switch",
        "Wireless access point",
        "Patch panel",
        "Router"
       ],
       "answer": 3,
       "explain": "A router reads the destination IP address and consults its routing table to move packets between networks. A switch forwards frames inside a LAN, an access point bridges radio clients onto the LAN, and a patch panel is passive cabling."
      },
      {
       "q": "In the ZCNA Packet Journey, a laptop with the wrong subnet mask is mainly a problem at which stage?",
       "options": [
        "Address",
        "Wire",
        "Switch",
        "Automate"
       ],
       "answer": 0,
       "explain": "The mask is part of the host's IP configuration, so it belongs to the Address stage. Wire covers physical links and frames, Switch covers MAC learning and VLANs, and Automate covers programmability."
      },
      {
       "q": "What best describes a cloud network in an IaaS provider?",
       "options": [
        "A WAN circuit leased from a mobile operator",
        "A Wi-Fi network shared by several buildings",
        "Virtual networks, subnets and route tables defined in software",
        "A physical switch rack the customer installs on site"
       ],
       "answer": 2,
       "explain": "Cloud networks are built from software objects — virtual networks, subnets, route tables and security rules — on the provider's hardware. The other options describe physical WAN, wireless or on-premises gear."
      },
      {
       "q": "Which statement about LANs and WANs is most accurate?",
       "options": [
        "A LAN always uses fibre and a WAN always uses copper",
        "A WAN links sites that are geographically far apart",
        "A WAN is always faster than a LAN",
        "A LAN can only connect up to 24 devices"
       ],
       "answer": 1,
       "explain": "WANs connect distant sites, usually over provider services. Media choice is not fixed to either, LANs are usually faster per cost than WANs, and LAN size is not limited to 24 devices."
      },
      {
       "q": "Most rooms in a school work, but one room has no connectivity. What is the most sensible first move?",
       "options": [
        "Reload the core router during class hours",
        "Open an urgent fault ticket with the internet service provider",
        "Reset every switch in the building to defaults",
        "Check that room's local links and host settings"
       ],
       "answer": 3,
       "explain": "When the fault is isolated to one area, start where the symptoms are. Reloading the core or resetting switches causes wider outages, and the provider link clearly works for the other rooms."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l2",
   "title": "Layered Models, Encapsulation and PDUs",
   "subtitle": "OSI and TCP/IP as maps for building and troubleshooting",
   "minutes": 24,
   "objectives": [
    "Name the seven OSI layers and the four TCP/IP layers and map them to each other",
    "Explain encapsulation and de-encapsulation and name the PDU at each layer",
    "Use a layered approach to troubleshoot a connectivity problem"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Networking is complicated because many jobs must happen at once: turning bits into light, finding the next device, finding the right network, delivering to the right application and making sure nothing is lost. **Layered models** split those jobs into stacked layers. Each layer offers a service to the one above and relies on the one below. That separation is why a web browser does not care whether you are on fibre or Wi-Fi."
    },
    {
     "type": "layers",
     "items": [
      {
       "label": "7 · Application",
       "parts": [
        "Interface to network services",
        "HTTP, DNS, SMTP, SSH"
       ]
      },
      {
       "label": "6 · Presentation",
       "parts": [
        "Data format, encoding, encryption",
        "TLS is often placed here"
       ]
      },
      {
       "label": "5 · Session",
       "parts": [
        "Opens, manages and closes dialogues",
        "Mostly handled inside apps today"
       ]
      },
      {
       "label": "4 · Transport",
       "parts": [
        "End-to-end delivery between applications",
        "TCP, UDP, port numbers"
       ]
      },
      {
       "label": "3 · Network",
       "parts": [
        "Logical addressing and path selection",
        "IPv4, IPv6, routers"
       ]
      },
      {
       "label": "2 · Data link",
       "parts": [
        "Frames on one link or LAN",
        "Ethernet, 802.11, MAC addresses, switches"
       ]
      },
      {
       "label": "1 · Physical",
       "parts": [
        "Bits as voltage, light or radio",
        "Cables, connectors, transceivers"
       ]
      }
     ],
     "title": "The OSI reference model (top layer first)"
    },
    {
     "type": "table",
     "head": [
      "TCP/IP layer",
      "OSI layers",
      "PDU name",
      "Address or identifier used"
     ],
     "rows": [
      [
       "Application",
       "7, 6, 5",
       "Data / message",
       "Names, URLs"
      ],
      [
       "Transport",
       "4",
       "Segment (TCP) / datagram (UDP)",
       "Port numbers"
      ],
      [
       "Internet",
       "3",
       "Packet",
       "IP addresses"
      ],
      [
       "Link (network access)",
       "2 and 1",
       "Frame (L2) / bits (L1)",
       "MAC addresses"
      ]
     ],
     "title": "OSI vs TCP/IP and the PDU at each layer"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "A **protocol data unit** is the chunk of data a layer works with, including that layer's header (and trailer, if any). Using the right name — segment, packet, frame — tells colleagues instantly which layer you mean.",
     "title": "PDU"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Data",
       "text": "The browser creates an HTTP request."
      },
      {
       "label": "Segment",
       "text": "TCP adds source and destination ports, sequence numbers and flags."
      },
      {
       "label": "Packet",
       "text": "IP adds source and destination IP addresses and a TTL."
      },
      {
       "label": "Frame",
       "text": "Ethernet adds destination and source MAC addresses, EtherType and an FCS trailer."
      },
      {
       "label": "Bits",
       "text": "The NIC turns the frame into electrical, optical or radio signals."
      }
     ],
     "title": "Encapsulation on the sending host"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Encapsulation (sending)",
       "items": [
        "Moves down the stack",
        "Each layer adds its own header",
        "Ethernet also adds a trailer (FCS)",
        "Result: a frame on the wire"
       ]
      },
      {
       "title": "De-encapsulation (receiving)",
       "items": [
        "Moves up the stack",
        "Each layer reads and removes its header",
        "A layer checks the field that says which protocol is next (EtherType, protocol number, port)",
        "Result: data delivered to the right application"
       ]
      }
     ],
     "title": "Two directions of the same idea"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "As a packet crosses a router, the **frame** is rebuilt for every hop — new source and destination MAC addresses for each link — while the **packet's** source and destination IP addresses stay the same end to end (unless NAT is in the path, covered in the Serve module). The router also lowers the TTL by one.",
     "title": "What a router actually rewrites"
    },
    {
     "type": "topology",
     "title": "One packet, three frames",
     "nodes": [
      {
       "id": "pc",
       "kind": "host",
       "label": "PC",
       "sub": "10.20.30.45 · MAC A",
       "x": 0,
       "y": 2
      },
      {
       "id": "r1",
       "kind": "router",
       "label": "R1",
       "sub": "MACs B and C",
       "x": 2,
       "y": 2
      },
      {
       "id": "r2",
       "kind": "router",
       "label": "R2",
       "sub": "MACs D and E",
       "x": 4,
       "y": 2
      },
      {
       "id": "srv",
       "kind": "server",
       "label": "Server",
       "sub": "10.50.0.10 · MAC F",
       "x": 6,
       "y": 2
      }
     ],
     "links": [
      {
       "a": "pc",
       "b": "r1",
       "label": "src A → dst B"
      },
      {
       "a": "r1",
       "b": "r2",
       "label": "src C → dst D"
      },
      {
       "a": "r2",
       "b": "srv",
       "label": "src E → dst F"
      }
     ],
     "caption": "The IP header (10.20.30.45 → 10.50.0.10) is identical on every link; only the Ethernet source and destination change at each router, and each router lowers the TTL by one."
    },
    {
     "type": "keypoints",
     "items": [
      "**Troubleshooting** — test one layer at a time instead of guessing.",
      "**Interoperability** — any vendor's switch can carry any vendor's IP traffic.",
      "**Change** — upgrade copper to fibre without rewriting applications.",
      "**Shared vocabulary** — \"it's a Layer 2 issue\" means the same thing everywhere."
     ],
     "title": "Why layers help engineers"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Layer 1",
       "text": "Is the link up? Check cable, port lights, interface status and error counters."
      },
      {
       "title": "Layer 2",
       "text": "Is the port in the right VLAN? Does the switch learn the host's MAC address?"
      },
      {
       "title": "Layer 3",
       "text": "Does the host have the right IP, mask and gateway? Can it ping the gateway?"
      },
      {
       "title": "Layer 4",
       "text": "Is the service listening on the expected port? Is a firewall blocking it?"
      },
      {
       "title": "Layer 7",
       "text": "Does the name resolve? Does the application return an error or a certificate warning?"
      }
     ],
     "title": "Bottom-up troubleshooting in five checks"
    },
    {
     "type": "cycle",
     "title": "A structured troubleshooting cycle",
     "center": "Evidence first",
     "items": [
      {
       "label": "Define the problem",
       "text": "Who is affected, what fails, since when, what changed?"
      },
      {
       "label": "Gather facts",
       "text": "Interface state, addresses, logs, captures — evidence before opinions."
      },
      {
       "label": "Isolate the layer",
       "text": "Bottom-up, top-down or follow the packet until one layer fails."
      },
      {
       "label": "Test one cause",
       "text": "Form a hypothesis and test it with a single, reversible change."
      },
      {
       "label": "Fix and verify",
       "text": "Apply the fix, then prove the original symptom is gone."
      },
      {
       "label": "Document",
       "text": "Record cause, fix and evidence in the ticket and the diagram."
      }
     ],
     "caption": "The layered checks above sit inside a repeatable loop. Change one thing at a time, verify, and write down what you found so the next engineer starts ahead."
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "# summary of one captured frame (fields shown per layer)",
      "Ethernet II, Src: 52:54:00:1a:2b:3c, Dst: 00:11:22:33:44:55, Type: IPv4 (0x0800)",
      "Internet Protocol Version 4, Src: 10.20.30.45, Dst: 10.50.0.10, TTL: 64",
      "Transmission Control Protocol, Src Port: 51544, Dst Port: 443, Flags: [SYN]",
      "# Layer 2 -> Layer 3 -> Layer 4: the EtherType says IPv4 follows, the protocol field says TCP follows"
     ],
     "title": "Seeing the layers in one capture summary",
     "note": "Packet analysers display each header on its own line. Reading them top to bottom is reading the stack from Layer 2 upward."
    },
    {
     "type": "scenario",
     "situation": "A user can ping the file server by IP address but cannot open `\\\\files.campus.local`. Other users can.",
     "options": [
      {
       "text": "Start at Layer 1 and replace the user's patch cable",
       "feedback": "A successful ping proves Layers 1–3 work between the user and the server.",
       "best": false
      },
      {
       "text": "Reboot the access switch",
       "feedback": "Layer 2 is working because the ping succeeded through that switch.",
       "best": false
      },
      {
       "text": "Change the server's IP address",
       "feedback": "The server is reachable and other users connect; changing its address would break them.",
       "best": false
      },
      {
       "text": "Check name resolution (DNS) on the user's machine",
       "feedback": "Correct. IP reachability is proven; the failing piece is turning the name into an address — an application-layer service.",
       "best": true
      }
     ],
     "title": "Choosing a starting layer"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Real protocols do not always fit neatly. TLS, QUIC and ARP are argued about in every classroom. Use the layers to organise your thinking — do not lose points arguing about edge cases.",
     "title": "Models are maps, not laws"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "OSI has seven layers and TCP/IP four; use them as maps, not laws.",
      "Encapsulation adds a header per layer: data → segment → packet → frame → bits.",
      "Routers rebuild the frame on every hop; IP addresses stay end to end unless NAT is in the path.",
      "Test one layer at a time and stop at the first layer that fails."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the PDU called at the transport layer when TCP is used?",
       "options": [
        "Frame",
        "Segment",
        "Packet",
        "Bit stream"
       ],
       "answer": 1,
       "explain": "TCP's PDU is a segment (UDP's is usually called a datagram). Frames belong to Layer 2, packets to Layer 3, and bits to Layer 1."
      },
      {
       "q": "Which TCP/IP layer corresponds to OSI Layer 3?",
       "options": [
        "Transport",
        "Application",
        "Internet",
        "Link"
       ],
       "answer": 2,
       "explain": "OSI Layer 3 (network) maps to the TCP/IP internet layer, where IP lives. Transport is OSI 4, application covers OSI 5–7, and link covers OSI 1–2."
      },
      {
       "q": "As a packet crosses three routers to reach a server, which fields normally change at every hop?",
       "options": [
        "Source and destination MAC addresses",
        "Source and destination IPv4 or IPv6 addresses",
        "TCP source and destination ports",
        "The application data payload"
       ],
       "answer": 0,
       "explain": "Each link has its own frame, so MAC addresses are rewritten per hop. IP addresses and ports stay the same end to end unless NAT is used, and the payload is untouched."
      },
      {
       "q": "A host pings its gateway successfully but a web app times out on TCP 443. Which layer should you test next?",
       "options": [
        "Layer 1 — reseat and re-test the patch cable",
        "Layer 2 — clear the switch MAC address table",
        "Layer 4 — test whether TCP 443 is reachable",
        "Layer 1 — reinstall the network card driver"
       ],
       "answer": 2,
       "explain": "A working ping to the gateway shows Layers 1–3 are fine locally, so the next check is Layer 4 reachability to port 443. The other options re-test layers already proven to work."
      },
      {
       "q": "During de-encapsulation, how does the receiving host know that the Ethernet payload is IPv4?",
       "options": [
        "The EtherType field value",
        "The destination MAC address",
        "The FCS trailer",
        "The TTL value"
       ],
       "answer": 0,
       "explain": "EtherType (0x0800 for IPv4, 0x86DD for IPv6) identifies the next protocol. The MAC address identifies the receiver, the FCS detects errors, and the TTL limits hop count."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l3",
   "title": "Ethernet: Frames, MAC Addresses, Media and PoE",
   "subtitle": "The Wire stage in detail — from frame fields to fibre and powered ports",
   "minutes": 28,
   "objectives": [
    "Describe the fields of an Ethernet frame and the structure of a MAC address",
    "Explain speed and duplex negotiation and recognise a duplex mismatch",
    "Choose between copper, multimode and single-mode fibre",
    "Size Power over Ethernet for phones, APs and cameras"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Ethernet (IEEE 802.3) is the language of wired LANs, from a home router to a 400 Gbps data-centre fabric. Every wired frame you will troubleshoot in this course is an Ethernet frame, so it pays to know its parts by heart."
    },
    {
     "type": "table",
     "head": [
      "Field",
      "Size",
      "Purpose"
     ],
     "rows": [
      [
       "Preamble + SFD",
       "7 + 1 bytes",
       "Synchronises the receiver; marks the start of the frame (not counted in frame size)"
      ],
      [
       "Destination MAC",
       "6 bytes",
       "Who should receive the frame (unicast, multicast or broadcast)"
      ],
      [
       "Source MAC",
       "6 bytes",
       "Who sent it — switches learn from this field"
      ],
      [
       "802.1Q tag (optional)",
       "4 bytes",
       "VLAN ID and priority on trunk links"
      ],
      [
       "EtherType",
       "2 bytes",
       "Next protocol: 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP"
      ],
      [
       "Payload",
       "46–1500 bytes",
       "The packet; padded if shorter than 46 bytes"
      ],
      [
       "FCS",
       "4 bytes",
       "CRC checksum; receivers discard frames that fail it"
      ]
     ],
     "title": "Ethernet II frame, field by field"
    },
    {
     "type": "packet",
     "title": "Ethernet II frame with an 802.1Q tag",
     "fields": [
      {
       "label": "Destination MAC",
       "bits": 48
      },
      {
       "label": "Source MAC",
       "bits": 48
      },
      {
       "label": "802.1Q tag (optional)",
       "bits": 32
      },
      {
       "label": "EtherType",
       "bits": 16
      },
      {
       "label": "Payload: 46–1500 bytes",
       "bits": 16,
       "variable": true
      },
      {
       "label": "FCS (CRC-32)",
       "bits": 32
      }
     ],
     "caption": "Preamble and SFD are not shown. The payload is drawn short — on a standard frame it is 46–1500 bytes — and the 4-byte tag is present only on trunk links."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "A **MAC address** is a 48-bit Layer 2 identifier, written as 12 hexadecimal digits (for example `00:1A:2B:3C:4D:5E` or `001a.2b3c.4d5e`). The first 24 bits are normally the manufacturer's **OUI**; the last 24 bits are assigned by that manufacturer.",
     "title": "MAC address"
    },
    {
     "type": "keypoints",
     "items": [
      "**Unicast** — one interface. The lowest bit of the first byte is 0.",
      "**Multicast** — a group; lowest bit of the first byte is 1 (e.g. `01:00:5E:…` for IPv4 multicast, `33:33:…` for IPv6).",
      "**Broadcast** — `FF:FF:FF:FF:FF:FF`, every device in the VLAN.",
      "**Locally administered** addresses (second-lowest bit of the first byte set) are common on virtual machines and phones that randomise their Wi-Fi MAC for privacy.",
      "Standard frame size is **64–1518 bytes** untagged, not counting the preamble (1522 with an 802.1Q tag); larger \"jumbo\" frames must be enabled end to end."
     ],
     "title": "MAC address facts you will use"
    },
    {
     "type": "cli",
     "device": "Switch SW1 · IOS-style CLI",
     "lines": [
      "SW1# show interfaces status",
      "Port      Name          Status       Vlan  Duplex  Speed Type",
      "Gi1/0/1   PC-Accounts   connected    10    a-full a-1000 10/100/1000BaseTX",
      "Gi1/0/2   Printer-2F    connected    10      half    100 10/100/1000BaseTX",
      "Gi1/0/3                 notconnect   1       auto   auto 10/100/1000BaseTX",
      "SW1# show interfaces Gi1/0/2 | include duplex|CRC|collision",
      "  Half-duplex, 100Mb/s, media type is 10/100/1000BaseTX",
      "     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored",
      "     0 output errors, 214 collisions, 0 interface resets",
      "     37 late collision, 0 deferred"
     ],
     "title": "Reading speed, duplex and errors",
     "note": "The `a-` prefix means the value was auto-negotiated. Gi1/0/2 has been hard-set to 100/half; late collisions on a half-duplex port are the classic sign that the other end is running full duplex."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If one end is fixed at full duplex and the other auto-negotiates, the auto side often falls back to **half duplex**. The link comes up and pings work, but throughput collapses: the half-duplex side logs late collisions and the full-duplex side logs CRC/runt errors. Best practice: leave both ends on auto, or hard-set **both** ends identically.",
     "title": "Duplex mismatch: the slow, silent fault"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Copper twisted pair",
       "items": [
        "RJ-45, up to 100 m per channel",
        "Cat5e: 1 Gbps; Cat6A: 10 Gbps at 100 m",
        "Carries PoE",
        "Cheapest for desks, phones, APs, cameras"
       ]
      },
      {
       "title": "Multimode fibre (MMF)",
       "items": [
        "Larger core, cheaper short-reach optics (e.g. 850 nm)",
        "Typical 10G short-reach: ~300 m on OM3, ~400 m on OM4",
        "Inside buildings and data centres",
        "Immune to electrical interference"
       ]
      },
      {
       "title": "Single-mode fibre (SMF)",
       "items": [
        "Tiny core, laser optics (1310/1550 nm)",
        "Kilometres to tens of kilometres",
        "Between buildings, campuses and to providers",
        "Higher optic cost, lowest loss"
       ]
      }
     ],
     "title": "Choosing the medium"
    },
    {
     "type": "table",
     "head": [
      "Standard",
      "Speed",
      "Medium",
      "Typical reach"
     ],
     "rows": [
      [
       "1000BASE-T",
       "1 Gbps",
       "Cat5e or better copper, 4 pairs",
       "100 m"
      ],
      [
       "2.5G/5GBASE-T",
       "2.5 / 5 Gbps",
       "Cat5e/Cat6 copper",
       "100 m — common for Wi-Fi 6E and Wi-Fi 7 AP uplinks"
      ],
      [
       "10GBASE-T",
       "10 Gbps",
       "Cat6A copper",
       "100 m (Cat6 shorter)"
      ],
      [
       "10GBASE-SR",
       "10 Gbps",
       "Multimode fibre",
       "Up to ~300–400 m (OM3/OM4)"
      ],
      [
       "10GBASE-LR",
       "10 Gbps",
       "Single-mode fibre",
       "10 km"
      ],
      [
       "25G/100G short-reach",
       "25 / 100 Gbps",
       "Multimode fibre or direct-attach copper",
       "Tens of metres — server and leaf links"
      ]
     ],
     "title": "Common Ethernet standards"
    },
    {
     "type": "table",
     "head": [
      "IEEE standard",
      "Common name",
      "Power at the switch port (PSE)",
      "Typical devices"
     ],
     "rows": [
      [
       "802.3af (Type 1)",
       "PoE",
       "15.4 W",
       "Desk IP phones, basic cameras"
      ],
      [
       "802.3at (Type 2)",
       "PoE+",
       "30 W",
       "Most Wi-Fi access points, PTZ-lite cameras"
      ],
      [
       "802.3bt (Type 3)",
       "PoE++ / 4PPoE",
       "60 W",
       "High-end APs, video phones, small displays"
      ],
      [
       "802.3bt (Type 4)",
       "PoE++ / 4PPoE",
       "90 W",
       "Large PTZ cameras, LED lighting, thin clients"
      ]
     ],
     "title": "Power over Ethernet at a glance"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "A 48-port PoE switch may support 30 W per port but only, say, 740 W in total. Add up the worst-case draw of every powered device plus headroom before you buy — APs and PTZ cameras draw most during boot and heater cycles. Illustrative example: 16 Wi-Fi 7 APs at 30 W (480 W) plus 20 phones at 7 W (140 W) is 620 W; with 20% headroom you need about 744 W, so a 740 W switch is already too small.",
     "title": "Budget the whole switch, not just the port"
    },
    {
     "type": "scenario",
     "situation": "Users say printing to the second-floor printer takes minutes. The switch port (shown above as Gi1/0/2) is hard-coded to 100/half; the printer's NIC is set to auto. Pings succeed.",
     "options": [
      {
       "text": "Replace the printer because its NIC is clearly faulty",
       "feedback": "Nothing shows hardware failure; the counters show a configuration mismatch.",
       "best": false
      },
      {
       "text": "Move the printer to a different VLAN",
       "feedback": "VLANs separate broadcast domains; they do not fix a physical-layer duplex mismatch.",
       "best": false
      },
      {
       "text": "Set the switch port back to auto speed and duplex (or match both ends manually) and clear the counters",
       "feedback": "Correct. Matching duplex removes the late collisions and restores throughput; clearing counters lets you confirm the fix.",
       "best": true
      },
      {
       "text": "Enable PoE on the port",
       "feedback": "PoE supplies power; it has no effect on duplex or collisions.",
       "best": false
      }
     ],
     "title": "The slow printer port"
    },
    {
     "type": "checklist",
     "title": "Copper and fibre cabling checklist",
     "items": [
      "Copper channel length (patch + horizontal + patch) is 100 m or less",
      "Cable category matches the speed (Cat6A for 10GBASE-T at full length)",
      "Every cable is labelled at both ends with the same ID as the patch-panel port",
      "Fibre type (OM3/OM4/OS2) matches the optics at both ends",
      "Optic wavelength and standard are identical at both ends (e.g. SR to SR)",
      "Fibre ends are inspected and cleaned before connecting",
      "PoE budget calculated with at least 20% headroom",
      "Speed/duplex left on auto at both ends, or hard-set identically",
      "Interface error counters checked after installation (CRC, input errors, collisions)",
      "Test results (certifier or light-meter readings) saved with the site documentation"
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "A switch learns from the source MAC and forwards on the destination MAC; the FCS lets receivers discard damaged frames.",
      "Duplex mismatches pass pings but wreck throughput — keep both ends on auto or set both identically.",
      "Copper reaches 100 m; multimode fibre suits in-building runs; single-mode fibre covers kilometres. Optics must match at both ends.",
      "Multi-gigabit copper (2.5/5 Gbps) is now the normal uplink for new Wi-Fi APs.",
      "Budget PoE for the whole switch, not just per port, and keep headroom."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which field in an Ethernet frame does a switch use to **learn** where a device is connected?",
       "options": [
        "Destination MAC address",
        "Source MAC address",
        "EtherType",
        "Frame check sequence"
       ],
       "answer": 1,
       "explain": "Switches record the source MAC and the arriving port in their MAC table. The destination MAC is used for forwarding, EtherType identifies the payload protocol, and the FCS detects errors."
      },
      {
       "q": "A port shows many late collisions and is running half duplex. What is the most likely cause?",
       "options": [
        "The cable is longer than 10 metres",
        "The access VLAN ID is higher than 1000",
        "The port is supplying PoE+",
        "The far end is running full duplex"
       ],
       "answer": 3,
       "explain": "Late collisions on a half-duplex port almost always indicate a duplex mismatch with a full-duplex neighbour. A 10 m cable is well within limits, VLAN numbers do not cause collisions, and PoE does not affect duplex."
      },
      {
       "q": "Two buildings are 4 km apart and need a 10 Gbps link. Which medium fits best?",
       "options": [
        "Single-mode fibre with long-reach optics",
        "Cat6A copper with 10GBASE-T",
        "Multimode OM4 fibre with 850 nm short-reach optics",
        "Cat5e copper with a PoE injector"
       ],
       "answer": 0,
       "explain": "Single-mode fibre and LR optics reach 10 km. Copper is limited to about 100 m and multimode short-reach optics to a few hundred metres."
      },
      {
       "q": "An access point needs up to 25 W. Which is the lowest PoE standard that can power it?",
       "options": [
        "802.3af (PoE)",
        "802.3at (PoE+)",
        "802.3bt Type 4",
        "802.3bt Type 3"
       ],
       "answer": 1,
       "explain": "802.3at delivers 30 W at the switch port, enough for a 25 W device after cable loss. 802.3af offers only 15.4 W; the 802.3bt types would work but are more than the minimum required."
      },
      {
       "q": "Which destination MAC address reaches every device in the same VLAN?",
       "options": [
        "00:00:00:00:00:00",
        "01:00:5E:00:00:01",
        "33:33:00:00:00:01",
        "FF:FF:FF:FF:FF:FF"
       ],
       "answer": 3,
       "explain": "All ones is the Ethernet broadcast address. All zeros is not a valid destination, 01:00:5E… is IPv4 multicast, and 33:33… is IPv6 multicast."
      },
      {
       "q": "Why is a duplex mismatch hard to spot?",
       "options": [
        "The interface goes down every few seconds",
        "The switch disables the port immediately",
        "Pings still succeed while throughput collapses",
        "The host loses its IP address"
       ],
       "answer": 2,
       "explain": "Small pings rarely trigger collisions, so basic tests pass while real traffic suffers. The link stays up, the switch does not shut the port, and IP settings are unaffected."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l4",
   "title": "Network Topologies and Architectures",
   "subtitle": "Campus tiers, spine-leaf, WAN, SOHO and cloud — choosing the right shape",
   "minutes": 25,
   "objectives": [
    "Compare two-tier (collapsed core) and three-tier campus designs",
    "Explain why data centres use spine-leaf fabrics",
    "Describe common WAN, SOHO and cloud connectivity options"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A **topology** is the shape of a network: which devices connect to which, and how traffic flows between them. Good topologies are predictable — every access switch is the same number of hops from the core, every path has a backup, and growth means adding a block rather than redesigning everything."
    },
    {
     "type": "layers",
     "items": [
      {
       "label": "Core",
       "parts": [
        "Very fast, very reliable backbone",
        "Connects distribution blocks, data centre and WAN edge",
        "No user ports, minimal policy"
       ]
      },
      {
       "label": "Distribution",
       "parts": [
        "Aggregates access switches per building or floor",
        "Default gateways for VLANs, routing, policy",
        "Usually deployed in redundant pairs"
       ]
      },
      {
       "label": "Access",
       "parts": [
        "Ports for users, phones, APs, printers, cameras",
        "VLAN assignment, PoE, port security",
        "Dual uplinks to distribution"
       ]
      },
      {
       "label": "Endpoints",
       "parts": [
        "Laptops, phones, IoT, access points"
       ]
      }
     ],
     "title": "Three-tier campus (top layer first)"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Two-tier (collapsed core)",
       "items": [
        "Core and distribution combined in one redundant pair",
        "Fewer boxes, lower cost",
        "Ideal for a single building or small campus",
        "Typical for a 100–1,500-user office"
       ]
      },
      {
       "title": "Three-tier",
       "items": [
        "Separate core layer joins many distribution blocks",
        "Scales to large multi-building campuses",
        "Failure in one building does not touch the core design",
        "More devices and cabling to manage"
       ]
      }
     ],
     "title": "Two-tier vs three-tier campus"
    },
    {
     "type": "topology",
     "title": "A two-tier (collapsed-core) office",
     "nodes": [
      {
       "id": "inet",
       "kind": "internet",
       "label": "Internet",
       "sub": "Two ISPs",
       "x": 3,
       "y": 0
      },
      {
       "id": "fw",
       "kind": "firewall",
       "label": "Edge firewall",
       "sub": "Dual-ISP / SD-WAN",
       "x": 3,
       "y": 1
      },
      {
       "id": "c1",
       "kind": "l3switch",
       "label": "CORE1",
       "sub": "VLAN gateways",
       "x": 2,
       "y": 2
      },
      {
       "id": "c2",
       "kind": "l3switch",
       "label": "CORE2",
       "sub": "VLAN gateways",
       "x": 4,
       "y": 2
      },
      {
       "id": "a1",
       "kind": "switch",
       "label": "Floor 1 access",
       "x": 1,
       "y": 4
      },
      {
       "id": "a2",
       "kind": "switch",
       "label": "Floor 2 access",
       "x": 3,
       "y": 4
      },
      {
       "id": "a3",
       "kind": "switch",
       "label": "Floor 3 access",
       "x": 5,
       "y": 4
      }
     ],
     "links": [
      {
       "a": "inet",
       "b": "fw"
      },
      {
       "a": "fw",
       "b": "c1"
      },
      {
       "a": "fw",
       "b": "c2"
      },
      {
       "a": "c1",
       "b": "c2",
       "label": "Peer link",
       "style": "bold"
      },
      {
       "a": "a1",
       "b": "c1"
      },
      {
       "a": "a1",
       "b": "c2"
      },
      {
       "a": "a2",
       "b": "c1"
      },
      {
       "a": "a2",
       "b": "c2"
      },
      {
       "a": "a3",
       "b": "c1"
      },
      {
       "a": "a3",
       "b": "c2"
      }
     ],
     "caption": "Every floor switch has one uplink to each core switch, so losing a cable or a switch on one floor never cuts off another floor. The core pair also hosts the VLAN gateways."
    },
    {
     "type": "text",
     "text": "Data centres moved from tree-shaped designs to **spine-leaf** fabrics because modern applications send most traffic *between* servers (east-west) rather than in and out (north-south). In a spine-leaf fabric every leaf switch connects to every spine switch, and leaves never connect to each other directly."
    },
    {
     "type": "keypoints",
     "items": [
      "Any server is exactly **leaf → spine → leaf** away from any other: predictable latency.",
      "All uplinks are active at once using equal-cost routing — no links sit blocked.",
      "Need more servers? Add a leaf. Need more bandwidth between leaves? Add a spine.",
      "Servers, storage, firewalls and border routers all attach to leaves."
     ],
     "title": "Spine-leaf rules of thumb"
    },
    {
     "type": "topology",
     "title": "Spine-leaf fabric",
     "nodes": [
      {
       "id": "s1",
       "kind": "l3switch",
       "label": "Spine 1",
       "x": 2,
       "y": 0
      },
      {
       "id": "s2",
       "kind": "l3switch",
       "label": "Spine 2",
       "x": 5,
       "y": 0
      },
      {
       "id": "l1",
       "kind": "switch",
       "label": "Leaf 1",
       "sub": "Rack 1",
       "x": 0.5,
       "y": 2
      },
      {
       "id": "l2",
       "kind": "switch",
       "label": "Leaf 2",
       "sub": "Rack 2",
       "x": 2.5,
       "y": 2
      },
      {
       "id": "l3",
       "kind": "switch",
       "label": "Leaf 3",
       "sub": "Rack 3",
       "x": 4.5,
       "y": 2
      },
      {
       "id": "l4",
       "kind": "switch",
       "label": "Border leaf",
       "sub": "Edge services",
       "x": 6.5,
       "y": 2
      },
      {
       "id": "v1",
       "kind": "server",
       "label": "Servers",
       "x": 0.5,
       "y": 4
      },
      {
       "id": "v2",
       "kind": "server",
       "label": "Servers",
       "x": 2.5,
       "y": 4
      },
      {
       "id": "v3",
       "kind": "storage",
       "label": "Storage",
       "x": 4.5,
       "y": 4
      },
      {
       "id": "wan",
       "kind": "router",
       "label": "WAN edge",
       "sub": "Internet / WAN",
       "x": 6.5,
       "y": 4
      }
     ],
     "links": [
      {
       "a": "l1",
       "b": "s1"
      },
      {
       "a": "l1",
       "b": "s2"
      },
      {
       "a": "l2",
       "b": "s1"
      },
      {
       "a": "l2",
       "b": "s2"
      },
      {
       "a": "l3",
       "b": "s1"
      },
      {
       "a": "l3",
       "b": "s2"
      },
      {
       "a": "l4",
       "b": "s1"
      },
      {
       "a": "l4",
       "b": "s2"
      },
      {
       "a": "v1",
       "b": "l1"
      },
      {
       "a": "v2",
       "b": "l2"
      },
      {
       "a": "v3",
       "b": "l3"
      },
      {
       "a": "wan",
       "b": "l4"
      }
     ],
     "caption": "Every leaf has one link to every spine and leaves never link to each other, so any two servers are leaf → spine → leaf apart and all uplinks forward at once using equal-cost routing."
    },
    {
     "type": "table",
     "head": [
      "Option",
      "What it is",
      "Strengths",
      "Watch out for"
     ],
     "rows": [
      [
       "Leased line / point-to-point",
       "Dedicated circuit between two sites",
       "Predictable, private",
       "Cost per Mbps, single path"
      ],
      [
       "Provider MPLS-style VPN",
       "Provider-run private routed network",
       "SLAs, QoS across the WAN",
       "Long lead times, price"
      ],
      [
       "Internet + IPsec VPN",
       "Encrypted tunnels across the public internet",
       "Cheap, fast to deploy",
       "No end-to-end performance guarantee"
      ],
      [
       "SD-WAN",
       "Controller-managed edges using several links at once",
       "Uses broadband, fibre and 4G/5G together; app-aware paths",
       "Needs good design of policies and security"
      ],
      [
       "4G/5G cellular",
       "Mobile data link",
       "Quick backup or temporary site link",
       "Variable latency, data caps"
      ],
      [
       "SASE edge",
       "SD-WAN combined with cloud-delivered security (web gateway, zero-trust access, firewall as a service)",
       "One policy for branches and remote users; inspected direct-to-cloud access",
       "Traffic steering, data privacy and provider dependence need careful design"
      ]
     ],
     "title": "WAN connectivity options"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "A small shop in Mirpur typically has one **all-in-one router**: a router with NAT to the ISP, a small built-in switch, a Wi-Fi access point, a DHCP server and a basic firewall — all in one device. The same functions exist in an enterprise; they are just split across dedicated, redundant devices.",
     "title": "A SOHO network in one box"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "On-premises",
       "items": [
        "You buy, rack and cable switches and routers",
        "VLANs and subnets configured device by device",
        "Capacity changes take weeks",
        "You control every layer"
       ]
      },
      {
       "title": "Public cloud (IaaS)",
       "items": [
        "Virtual networks and subnets created through a console or API",
        "Route tables, gateways and security groups are software objects",
        "Capacity changes take minutes",
        "Provider controls the physical layers; you control the logical ones"
       ]
      }
     ],
     "title": "On-premises vs cloud networking"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Most organisations in 2026 run some workloads on-premises, some in one or more clouds and many as SaaS. The WAN is therefore no longer \"branch to head office\" but \"every site and user to every cloud\". That is why IP addressing must be planned so on-prem and cloud ranges never overlap.",
     "title": "Hybrid is the normal case"
    },
    {
     "type": "case",
     "title": "A Dhaka head office refresh",
     "context": "A garments buying house in Gulshan, Dhaka has 220 staff over three floors of one building, a small server room, two internet providers and an online ERP hosted in a cloud provider. Today every floor has one unmanaged switch daisy-chained to the next, and when the second-floor switch fails, the third floor loses everything.",
     "questions": [
      "Which campus design (two-tier or three-tier) fits, and why?",
      "How should the floor switches connect to remove the daisy-chain weakness?",
      "How should the office reach the cloud ERP, and what protects that path?"
     ],
     "answer": "A **two-tier (collapsed-core)** design fits one building with 220 users: a redundant pair of layer 3 core/distribution switches in the server room and one managed access switch (or stack) per floor. Each access switch gets **two uplinks — one to each core switch** — so no floor depends on another. The core pair hosts the VLAN gateways. For the ERP, use both ISPs: an **SD-WAN or dual-ISP edge** with encrypted tunnels (or a private cloud interconnect if budget allows) to the cloud network, with automatic failover between providers and addressing that does not overlap the cloud ranges."
    },
    {
     "type": "scenario",
     "situation": "A fintech start-up in Banani is building a small data hall with 12 racks of virtualised servers that talk to each other constantly. The vendor proposes a classic tree: two core switches, each rack switch connected to only one of them.",
     "options": [
      {
       "text": "Ask for a spine-leaf fabric: each rack (leaf) switch uplinks to every spine, using equal-cost paths",
       "feedback": "Correct. Spine-leaf gives every server pair the same hop count, keeps all links active and grows by adding leaves or spines.",
       "best": true
      },
      {
       "text": "Accept the tree — it is cheaper and simpler",
       "feedback": "Single uplinks per rack make each rack depend on one core switch, and east-west traffic gets uneven paths.",
       "best": false
      },
      {
       "text": "Connect all rack switches to each other in a ring",
       "feedback": "Rings create long, uneven paths and loop-prevention complexity as the hall grows.",
       "best": false
      },
      {
       "text": "Put all servers on one large switch",
       "feedback": "One switch is a single point of failure and limits growth.",
       "best": false
      }
     ],
     "title": "Choosing a data-centre shape"
    },
    {
     "type": "template",
     "title": "Site topology and inventory worksheet",
     "purpose": "Record every network device, its role and its uplinks so diagrams and troubleshooting start from facts.",
     "columns": [
      "Device name",
      "Role / tier",
      "Location",
      "Model category & ports",
      "Uplink 1 → peer:port",
      "Uplink 2 → peer:port",
      "Management IP"
     ],
     "example": [
      [
       "DHK-F2-AS1",
       "Access",
       "Floor 2 IDF",
       "48-port PoE+ L2 switch",
       "DHK-CORE1 Gi1/0/2",
       "DHK-CORE2 Gi1/0/2",
       "10.10.99.12"
      ]
     ],
     "rows": 8
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Two-tier (collapsed core) suits one building; three-tier adds a separate core when many buildings must join.",
      "Data centres use spine-leaf: every leaf to every spine, predictable hops, all links active.",
      "WAN choices range from leased lines to internet VPN, SD-WAN, cellular and SASE; most branches now mix several.",
      "Hybrid cloud is the normal case, so on-premises and cloud address ranges must never overlap."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "In a spine-leaf fabric, how are leaf switches connected?",
       "options": [
        "Each leaf connects to every other leaf",
        "Each leaf connects to every spine",
        "Leaves connect in a ring to one spine",
        "Each leaf connects to exactly one spine"
       ],
       "answer": 1,
       "explain": "Full leaf-to-spine connectivity gives equal-cost paths and a fixed hop count. Leaf-to-leaf links, rings and single uplinks break that predictability."
      },
      {
       "q": "A single-building office of 300 users needs redundancy but a small budget. Which design fits best?",
       "options": [
        "Three-tier with a separate core",
        "Spine-leaf data-centre fabric",
        "Two-tier collapsed core",
        "Daisy-chained unmanaged switches"
       ],
       "answer": 2,
       "explain": "Collapsing core and distribution into a redundant pair suits one building. A separate core adds cost without benefit here, spine-leaf targets server fabrics, and daisy-chains create single points of failure."
      },
      {
       "q": "Which layer of a three-tier campus normally hosts the default gateways for user VLANs?",
       "options": [
        "Access",
        "Core",
        "Data-centre server block",
        "Distribution"
       ],
       "answer": 3,
       "explain": "Distribution switches aggregate access blocks and usually provide layer 3 gateways and policy. The core focuses on fast transport, access provides user ports, and the data-centre block hosts servers rather than user gateways."
      },
      {
       "q": "A branch needs a WAN link this week at low cost. Which option is quickest?",
       "options": [
        "Internet broadband with an IPsec VPN",
        "A new provider MPLS-style circuit",
        "A dedicated leased line",
        "A dark-fibre build all the way to head office"
       ],
       "answer": 0,
       "explain": "Internet VPNs can be deployed as soon as broadband is available. Provider private circuits and fibre builds usually take weeks or months."
      },
      {
       "q": "Why must on-premises and cloud IP ranges be planned together?",
       "options": [
        "Overlapping ranges make routing between them fail",
        "Cloud providers forbid private address ranges",
        "Cloud subnets must always use public addresses",
        "Overlaps only affect wireless users"
       ],
       "answer": 0,
       "explain": "If the same prefix exists on both sides, routers cannot decide where to send traffic. Cloud networks commonly use private ranges, do not require public addressing for subnets, and overlaps affect every user."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l5",
   "title": "Transport Protocols and First Troubleshooting Tools",
   "subtitle": "TCP vs UDP, ports, the three-way handshake — and the commands you will run every day",
   "minutes": 30,
   "objectives": [
    "Compare TCP and UDP and match common applications to each",
    "Describe the TCP three-way handshake and the role of port numbers",
    "Use ping, traceroute, ipconfig/ip and arp to locate a fault"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "IP gets a packet to the right **host**. The transport layer gets the data to the right **application** on that host and decides how careful delivery must be. Two protocols do almost all of this work: **TCP** for reliable, ordered streams and **UDP** for fast, lightweight messages."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "TCP",
       "items": [
        "Connection-oriented: handshake before data",
        "Reliable: sequence numbers, acknowledgements, retransmission",
        "Flow control (window) and congestion control",
        "20-byte minimum header",
        "Web (HTTP/1.1, HTTP/2), SSH, email, file transfer"
       ]
      },
      {
       "title": "UDP",
       "items": [
        "Connectionless: just send",
        "No built-in retransmission or ordering",
        "8-byte header, very low overhead",
        "Applications add reliability if they need it",
        "DNS queries, DHCP, VoIP/video media, NTP, SNMP, QUIC (HTTP/3)"
       ]
      }
     ],
     "title": "TCP vs UDP"
    },
    {
     "type": "packet",
     "title": "TCP header (20 bytes without options)",
     "fields": [
      {
       "label": "Source port",
       "bits": 16
      },
      {
       "label": "Destination port",
       "bits": 16
      },
      {
       "label": "Sequence number",
       "bits": 32
      },
      {
       "label": "Acknowledgement number",
       "bits": 32
      },
      {
       "label": "Data offset",
       "bits": 4
      },
      {
       "label": "Reserved",
       "bits": 4
      },
      {
       "label": "Flags",
       "bits": 8
      },
      {
       "label": "Window",
       "bits": 16
      },
      {
       "label": "Checksum",
       "bits": 16
      },
      {
       "label": "Urgent pointer",
       "bits": 16
      },
      {
       "label": "Options (0–40 bytes)",
       "bits": 32,
       "variable": true
      }
     ],
     "caption": "Ports identify the applications, sequence and acknowledgement numbers make delivery reliable, and the 8 flag bits (CWR, ECE, URG, ACK, PSH, RST, SYN, FIN) drive the handshake. Options are 0–40 bytes and are drawn short."
    },
    {
     "type": "packet",
     "title": "UDP header (8 bytes)",
     "fields": [
      {
       "label": "Source port",
       "bits": 16
      },
      {
       "label": "Destination port",
       "bits": 16
      },
      {
       "label": "Length",
       "bits": 16
      },
      {
       "label": "Checksum",
       "bits": 16
      }
     ],
     "caption": "Four 16-bit fields and nothing else: no handshake, no sequence numbers, no retransmission. That is why UDP suits DNS queries, voice media and QUIC, which adds its own reliability on top."
    },
    {
     "type": "sequence",
     "title": "TCP connection: open, use, close",
     "actors": [
      "Client 10.20.30.45",
      "Server 10.50.0.10"
     ],
     "steps": [
      {
       "from": 0,
       "to": 1,
       "label": "SYN, seq = x",
       "note": "port 51544 → 443"
      },
      {
       "from": 1,
       "to": 0,
       "label": "SYN-ACK, seq=y, ack=x+1",
       "reply": true
      },
      {
       "from": 0,
       "to": 1,
       "label": "ACK, ack = y+1",
       "note": "connection established"
      },
      {
       "from": 0,
       "to": 1,
       "label": "Data: TLS + HTTP request"
      },
      {
       "from": 1,
       "to": 0,
       "label": "Data and ACKs",
       "reply": true
      },
      {
       "from": 0,
       "to": 1,
       "label": "FIN",
       "note": "client finished sending"
      },
      {
       "from": 1,
       "to": 0,
       "label": "ACK, then FIN",
       "reply": true
      },
      {
       "from": 0,
       "to": 1,
       "label": "ACK",
       "note": "connection closed"
      }
     ],
     "caption": "Three messages open the connection; each direction is then closed separately with FIN and ACK. A RST instead of a SYN-ACK means the host is reachable but nothing listens on that port."
    },
    {
     "type": "table",
     "head": [
      "Port",
      "Transport",
      "Service"
     ],
     "rows": [
      [
       "20/21",
       "TCP",
       "FTP data/control"
      ],
      [
       "22",
       "TCP",
       "SSH (secure remote CLI)"
      ],
      [
       "23",
       "TCP",
       "Telnet (insecure — avoid)"
      ],
      [
       "25",
       "TCP",
       "SMTP (mail transfer)"
      ],
      [
       "53",
       "UDP and TCP",
       "DNS"
      ],
      [
       "67/68",
       "UDP",
       "DHCP server/client"
      ],
      [
       "69",
       "UDP",
       "TFTP"
      ],
      [
       "80 / 443",
       "TCP (443 also UDP for QUIC)",
       "HTTP / HTTPS"
      ],
      [
       "123",
       "UDP",
       "NTP"
      ],
      [
       "161/162",
       "UDP",
       "SNMP / SNMP traps"
      ],
      [
       "514",
       "UDP",
       "Syslog"
      ]
     ],
     "title": "Port numbers you should recognise"
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "Port ranges",
       "expr": "0–1023 well-known · 1024–49151 registered · 49152–65535 dynamic",
       "meaning": "Servers listen on well-known or registered ports; clients pick a temporary (ephemeral) source port."
      },
      {
       "name": "Socket",
       "expr": "socket = IP address + protocol + port",
       "meaning": "A TCP connection is identified by both sockets: client IP:port and server IP:port."
      },
      {
       "name": "Bandwidth-delay product",
       "expr": "BDP = bandwidth × round-trip time",
       "meaning": "How much data must be \"in flight\" to fill a link; e.g. 100 Mbps × 0.04 s = 4 Mb ≈ 500 KB."
      }
     ],
     "title": "Numbers behind the transport layer"
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ ping -c 3 10.20.30.1",
      "64 bytes from 10.20.30.1: icmp_seq=1 ttl=64 time=0.61 ms",
      "64 bytes from 10.20.30.1: icmp_seq=2 ttl=64 time=0.55 ms",
      "64 bytes from 10.20.30.1: icmp_seq=3 ttl=64 time=0.58 ms",
      "3 packets transmitted, 3 received, 0% packet loss, time 2003ms",
      "$ traceroute -n 203.0.113.80",
      " 1  10.20.30.1    0.70 ms  0.66 ms  0.63 ms",
      " 2  100.64.12.1   4.91 ms  5.02 ms  4.89 ms",
      " 3  * * *",
      " 4  203.0.113.80  18.44 ms  18.39 ms  18.51 ms"
     ],
     "title": "ping and traceroute from Linux",
     "note": "Each traceroute line is one router hop, found by sending probes with TTL 1, 2, 3… and listening for ICMP \"time exceeded\" replies. A `* * *` line only means that hop did not answer — the trace still reached the target."
    },
    {
     "type": "cli",
     "device": "Windows host",
     "lines": [
      "C:\\> ipconfig /all",
      "   IPv4 Address. . . . . . . . . . . : 10.20.30.45(Preferred)",
      "   Subnet Mask . . . . . . . . . . . : 255.255.255.0",
      "   Default Gateway . . . . . . . . . : 10.20.30.1",
      "   DNS Servers . . . . . . . . . . . : 10.50.0.53",
      "C:\\> arp -a",
      "Interface: 10.20.30.45 --- 0x7",
      "  Internet Address      Physical Address      Type",
      "  10.20.30.1            00-11-22-33-44-55     dynamic"
     ],
     "title": "ipconfig and arp on Windows",
     "note": "ARP maps an IPv4 address to a MAC address. Seeing the gateway in the ARP table proves the host reached it at Layer 2."
    },
    {
     "type": "table",
     "head": [
      "Task",
      "Windows",
      "Linux",
      "IOS-style device"
     ],
     "rows": [
      [
       "Show IP settings",
       "`ipconfig /all`",
       "`ip addr` / `ip -br addr`",
       "`show ip interface brief`"
      ],
      [
       "Show routes",
       "`route print`",
       "`ip route`",
       "`show ip route`"
      ],
      [
       "Show ARP / neighbour cache",
       "`arp -a`",
       "`ip neigh`",
       "`show ip arp`"
      ],
      [
       "Test reachability",
       "`ping`",
       "`ping`",
       "`ping`"
      ],
      [
       "Trace the path",
       "`tracert` (ICMP probes)",
       "`traceroute` (UDP probes by default)",
       "`traceroute`"
      ],
      [
       "Test a TCP port",
       "`Test-NetConnection host -Port 443`",
       "`nc -vz host 443`",
       "`telnet host 443` (as a quick test)"
      ]
     ],
     "title": "Same job, three platforms"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Ping 127.0.0.1",
       "text": "Confirms the host's own TCP/IP stack works."
      },
      {
       "title": "Ping your own IP",
       "text": "Confirms the interface is configured and up."
      },
      {
       "title": "Ping the default gateway",
       "text": "Confirms the local LAN, VLAN and gateway are fine."
      },
      {
       "title": "Ping a remote IP",
       "text": "Confirms routing beyond the gateway (a firewall may block ICMP — note it)."
      },
      {
       "title": "Ping the server by name",
       "text": "Confirms DNS. If the IP works but the name fails, the problem is name resolution."
      }
     ],
     "title": "A five-ping method for \"I can't reach the server\""
    },
    {
     "type": "scenario",
     "situation": "A host's `ipconfig` shows IP 10.20.30.45/24 and gateway 10.20.31.1. It can ping other PCs in 10.20.30.0/24 but nothing outside.",
     "options": [
      {
       "text": "Replace the switch port because the link is unstable",
       "feedback": "Local pings succeed, so the link and switch are working.",
       "best": false
      },
      {
       "text": "Change the mask to /16 so everything becomes local",
       "feedback": "That hides the symptom and breaks routing for other subnets.",
       "best": false
      },
      {
       "text": "Correct the default gateway to the router's address inside 10.20.30.0/24",
       "feedback": "Correct. 10.20.31.1 is not in the host's own subnet, so the host cannot ARP for it and off-subnet traffic has nowhere to go.",
       "best": true
      },
      {
       "text": "Flush the DNS cache",
       "feedback": "The failure happens with IP addresses too; DNS is not the cause.",
       "best": false
      }
     ],
     "title": "Reading the clues"
    },
    {
     "type": "reflection",
     "prompt": "Think of the last time \"the internet\" failed for you at home, work or university. Using the Packet Journey stages, which stage do you now think failed, and which single command would have proved it fastest?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Protocol",
       "def": "A set of agreed rules for formatting and exchanging data between devices."
      },
      {
       "term": "Encapsulation",
       "def": "Adding a layer's header (and trailer) around data as it moves down the stack."
      },
      {
       "term": "PDU",
       "def": "Protocol data unit — the data unit at a given layer: data, segment, packet, frame, bits."
      },
      {
       "term": "MAC address",
       "def": "48-bit Layer 2 interface identifier; first 24 bits usually the manufacturer OUI."
      },
      {
       "term": "EtherType",
       "def": "Ethernet field naming the payload protocol, e.g. 0x0800 IPv4, 0x86DD IPv6."
      },
      {
       "term": "FCS",
       "def": "Frame check sequence — a CRC at the end of a frame used to detect corruption."
      },
      {
       "term": "Duplex",
       "def": "Whether a link can send and receive at the same time (full) or only one at a time (half)."
      },
      {
       "term": "PoE",
       "def": "Power over Ethernet — IEEE 802.3af/at/bt delivery of DC power over twisted-pair cable."
      },
      {
       "term": "Spine-leaf",
       "def": "Data-centre topology where every leaf switch connects to every spine switch."
      },
      {
       "term": "Collapsed core",
       "def": "Two-tier campus design where core and distribution roles share one switch pair."
      },
      {
       "term": "Three-way handshake",
       "def": "TCP connection set-up: SYN, SYN-ACK, ACK."
      },
      {
       "term": "Ephemeral port",
       "def": "Temporary client-side port chosen from the dynamic range for one connection."
      },
      {
       "term": "TTL",
       "def": "IP time-to-live field, decreased by each router; traceroute uses it to find hops."
      },
      {
       "term": "ARP",
       "def": "Address Resolution Protocol — finds the MAC address for a known IPv4 address on the local network."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "TCP is connection-oriented and reliable; UDP is lightweight and leaves reliability to the application (as QUIC does).",
      "The handshake is SYN, SYN-ACK, ACK; a socket is IP address + protocol + port.",
      "Ping, traceroute, ipconfig/ip and arp/ip neigh answer most first-line questions in minutes.",
      "Work outward: own stack, own IP, gateway, remote IP, then names."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which application traffic is **usually** carried by UDP?",
       "options": [
        "An SSH session to a router",
        "Sending email between mail servers",
        "An HTTP/1.1 file download",
        "Voice media in a VoIP call"
       ],
       "answer": 3,
       "explain": "Real-time voice prefers UDP because late retransmissions are useless. SSH, SMTP and HTTP/1.1 all rely on TCP's reliability."
      },
      {
       "q": "What is the correct order of the TCP three-way handshake?",
       "options": [
        "SYN, ACK, FIN",
        "ACK, SYN, SYN-ACK",
        "SYN, SYN-ACK, ACK",
        "SYN, ACK, SYN-ACK"
       ],
       "answer": 2,
       "explain": "The client sends SYN, the server answers SYN-ACK and the client confirms with ACK. The other sequences are not valid TCP set-up exchanges."
      },
      {
       "q": "A trace shows `* * *` at hop 3 and then reaches the destination at hop 4. What does hop 3 tell you?",
       "options": [
        "Every packet is being dropped at hop 3 by an ACL",
        "That router did not answer the probes",
        "The destination is unreachable",
        "The TTL was set too high"
       ],
       "answer": 1,
       "explain": "Many routers rate-limit or block ICMP time-exceeded messages; traffic still passes, as hop 4 proves. Nothing is dropped, the destination answered, and TTL is set correctly by the tool."
      },
      {
       "q": "A host pings its gateway and remote IPs but fails when using server names. Which service should you check?",
       "options": [
        "ARP",
        "DNS",
        "DHCP",
        "STP"
       ],
       "answer": 1,
       "explain": "Working IP connectivity with failing names points to name resolution. ARP and DHCP already worked (the host reaches its gateway), and STP is a switch loop-prevention protocol."
      },
      {
       "q": "Which port and transport pair is correct?",
       "options": [
        "SSH — TCP 22",
        "DNS — TCP 80",
        "HTTPS — UDP 161",
        "NTP — TCP 25"
       ],
       "answer": 0,
       "explain": "SSH uses TCP 22. DNS uses port 53, HTTPS uses 443, SNMP uses 161 and NTP uses UDP 123; TCP 25 is SMTP."
      },
      {
       "q": "Which command on a Linux host shows the ARP/neighbour cache?",
       "options": [
        "`ip route`",
        "`ss -t`",
        "`traceroute -n`",
        "`ip neigh`"
       ],
       "answer": 3,
       "explain": "`ip neigh` lists IP-to-MAC mappings. `ip route` shows routes, `ss -t` lists TCP sockets and `traceroute -n` traces the path."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m2",
 "order": 2,
 "code": "Address",
 "title": "IPv4 & IPv6 Addressing",
 "subtitle": "Binary, subnetting, VLSM and IPv6 — giving every interface a correct, planned address",
 "outcomes": [
  "Convert IPv4 addresses and masks between decimal and binary and recognise special ranges",
  "Subnet any IPv4 block and calculate network, broadcast and usable range quickly",
  "Design and document a VLSM addressing plan and verify hosts against it",
  "Read, compress and classify IPv6 addresses and build EUI-64 interface IDs",
  "Configure IPv6 with SLAAC or DHCPv6 and plan a dual-stack rollout"
 ],
 "lessons": [
  {
   "id": "m2-l1",
   "title": "IPv4 Addresses: Structure, Classes and Private Ranges",
   "subtitle": "Binary, masks, the classful past, CIDR and the ranges you must recognise",
   "minutes": 26,
   "objectives": [
    "Convert between dotted-decimal and binary for any octet",
    "Explain network and host portions using a mask or prefix length",
    "Contrast the historical class system with CIDR",
    "Recognise private, loopback, link-local, CGN and documentation ranges"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "An IPv4 address is **32 bits**, written as four 8-bit **octets** in dotted decimal — for example `192.168.10.25`. Part of those bits identifies the **network** (which subnet) and the rest identifies the **host** (which interface on that subnet). The **subnet mask** or **prefix length** tells everyone where the dividing line falls."
    },
    {
     "type": "packet",
     "title": "IPv4 header (20 bytes without options)",
     "fields": [
      {
       "label": "Version",
       "bits": 4
      },
      {
       "label": "IHL",
       "bits": 4
      },
      {
       "label": "DSCP",
       "bits": 6
      },
      {
       "label": "ECN",
       "bits": 2
      },
      {
       "label": "Total length",
       "bits": 16
      },
      {
       "label": "Identification",
       "bits": 16
      },
      {
       "label": "Flags",
       "bits": 3
      },
      {
       "label": "Fragment offset",
       "bits": 13
      },
      {
       "label": "TTL",
       "bits": 8
      },
      {
       "label": "Protocol",
       "bits": 8
      },
      {
       "label": "Header checksum",
       "bits": 16
      },
      {
       "label": "Source address",
       "bits": 32
      },
      {
       "label": "Destination address",
       "bits": 32
      }
     ],
     "caption": "The two 32-bit address fields are the subject of this module. TTL, Protocol and the DSCP bits come back later in routing, ACLs and QoS. Options are rare and not shown."
    },
    {
     "type": "table",
     "head": [
      "Decimal",
      "Binary",
      "Place values that are 1"
     ],
     "rows": [
      [
       "192",
       "`11000000`",
       "128 + 64"
      ],
      [
       "172",
       "`10101100`",
       "128 + 32 + 8 + 4"
      ],
      [
       "10",
       "`00001010`",
       "8 + 2"
      ],
      [
       "248",
       "`11111000`",
       "128 + 64 + 32 + 16 + 8"
      ],
      [
       "255",
       "`11111111`",
       "all eight bits"
      ]
     ],
     "title": "Binary place values of one octet: 128 · 64 · 32 · 16 · 8 · 4 · 2 · 1"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Start at 128",
       "text": "If the number is 128 or more, write 1 and subtract 128; otherwise write 0."
      },
      {
       "title": "Move right",
       "text": "Repeat with 64, 32, 16, 8, 4, 2 and 1 using what is left."
      },
      {
       "title": "Check",
       "text": "Add the place values that hold a 1 — the total must equal the original number."
      },
      {
       "title": "Example: 200",
       "text": "200 − 128 = 72 → 1; 72 − 64 = 8 → 1; 32 → 0; 16 → 0; 8 − 8 = 0 → 1; then 0,0,0 → `11001000`."
      }
     ],
     "title": "Decimal to binary by subtraction"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "A **subnet mask** is 32 bits with all network bits set to 1 and all host bits set to 0. `255.255.255.0` has 24 ones, so it is written in **CIDR prefix notation** as `/24`. `10.1.4.20/22` means \"the first 22 bits identify the network\".",
     "title": "Subnet mask and prefix length"
    },
    {
     "type": "table",
     "head": [
      "Class",
      "First octet",
      "Default mask",
      "Original purpose"
     ],
     "rows": [
      [
       "A",
       "1–126",
       "/8 (255.0.0.0)",
       "Very large networks (127 reserved for loopback)"
      ],
      [
       "B",
       "128–191",
       "/16 (255.255.0.0)",
       "Medium networks"
      ],
      [
       "C",
       "192–223",
       "/24 (255.255.255.0)",
       "Small networks"
      ],
      [
       "D",
       "224–239",
       "—",
       "Multicast groups"
      ],
      [
       "E",
       "240–255",
       "—",
       "Reserved / experimental"
      ]
     ],
     "title": "The classful system (historical)"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Classful (1980s)",
       "items": [
        "Mask implied by the first octet",
        "Only /8, /16 or /24 networks",
        "Huge waste: a 300-host site needed a whole /16 (65,534 hosts)",
        "Still useful to recognise multicast (D) and reserved (E) space"
       ]
      },
      {
       "title": "CIDR (1993 onward, today)",
       "items": [
        "Prefix length written explicitly: /8 to /32",
        "Any boundary: /22, /27, /30…",
        "Allows route summarisation (aggregation)",
        "The only model routers and clouds use today"
       ]
      }
     ],
     "title": "Classful thinking vs CIDR"
    },
    {
     "type": "table",
     "head": [
      "Range",
      "Name",
      "Use"
     ],
     "rows": [
      [
       "10.0.0.0/8",
       "Private (RFC 1918)",
       "Large enterprise and cloud networks"
      ],
      [
       "172.16.0.0/12",
       "Private (RFC 1918)",
       "172.16.0.0 – 172.31.255.255"
      ],
      [
       "192.168.0.0/16",
       "Private (RFC 1918)",
       "Homes, SOHO, labs"
      ],
      [
       "100.64.0.0/10",
       "Shared address space",
       "Carrier-grade NAT between ISP and customer"
      ],
      [
       "127.0.0.0/8",
       "Loopback",
       "The host itself (127.0.0.1)"
      ],
      [
       "169.254.0.0/16",
       "Link-local",
       "Self-assigned when DHCP fails (often called APIPA)"
      ],
      [
       "192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24",
       "Documentation",
       "Examples in books and training — never routed"
      ],
      [
       "224.0.0.0/4",
       "Multicast",
       "One-to-many groups (e.g. routing protocols)"
      ]
     ],
     "title": "Special IPv4 ranges to recognise on sight"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Private ranges are not routed on the public internet, so thousands of organisations reuse `10.0.0.0/8` safely. To browse the web, traffic from private hosts is translated to a public address by NAT — you will configure that in the Serve module.",
     "title": "Private addresses need translation to reach the internet"
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "Total addresses",
       "expr": "2^(32 − prefix)",
       "meaning": "A /24 has 2^8 = 256 addresses; a /22 has 2^10 = 1,024."
      },
      {
       "name": "Usable hosts",
       "expr": "2^h − 2   (h = host bits)",
       "meaning": "Subtract the network address (all host bits 0) and broadcast address (all host bits 1). A /24 gives 254 hosts."
      },
      {
       "name": "Exceptions",
       "expr": "/31 → 2 usable · /32 → 1 address",
       "meaning": "A /31 is used on point-to-point links with no broadcast; a /32 identifies a single host or loopback."
      }
     ],
     "title": "Counting addresses"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1# show ip interface brief",
      "Interface              IP-Address      OK? Method Status                Protocol",
      "GigabitEthernet0/0     192.168.10.1    YES manual up                    up",
      "GigabitEthernet0/1     10.0.12.1       YES manual up                    up",
      "GigabitEthernet0/2     unassigned      YES unset  administratively down down",
      "Loopback0              1.1.1.1         YES manual up                    up",
      "R1# show running-config interface GigabitEthernet0/0",
      "interface GigabitEthernet0/0",
      " ip address 192.168.10.1 255.255.255.0"
     ],
     "title": "Seeing addresses on a router",
     "note": "`show ip interface brief` lists addresses but not masks; use `show running-config interface` or `show ip interface` to see the mask."
    },
    {
     "type": "scenario",
     "situation": "A new engineer plans to number a branch LAN as `172.32.10.0/24`, believing all 172.x addresses are private.",
     "options": [
      {
       "text": "Approve it — every 172.x.x.x address is private",
       "feedback": "Only 172.16.0.0 – 172.31.255.255 is private. 172.32.x.x is public space owned by someone else.",
       "best": false
      },
      {
       "text": "Use 169.254.10.0/24 instead",
       "feedback": "Link-local space is for self-assigned addresses on one link and is not routed — unsuitable for a LAN plan.",
       "best": false
      },
      {
       "text": "Use 203.0.113.0/24 instead",
       "feedback": "That is documentation space, reserved for examples, not production networks.",
       "best": false
      },
      {
       "text": "Change it to a subnet inside 172.16.0.0/12, such as 172.20.10.0/24",
       "feedback": "Correct. That keeps the branch in RFC 1918 space and avoids clashing with real public addresses.",
       "best": true
      }
     ],
     "title": "Is it private?"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "An IPv4 address is 32 bits; the mask or prefix length marks where the network part ends.",
      "Classes are history — CIDR prefixes of any length are what routers and clouds use.",
      "Recognise on sight: RFC 1918 private, 100.64.0.0/10 CGN, 127/8 loopback, 169.254/16 link-local and the three documentation ranges.",
      "Usable hosts = 2^h − 2, except /31 point-to-point links and /32 host routes."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is 11110000 in decimal?",
       "options": [
        "224",
        "248",
        "240",
        "192"
       ],
       "answer": 2,
       "explain": "128 + 64 + 32 + 16 = 240. 224 is 11100000, 248 is 11111000 and 192 is 11000000."
      },
      {
       "q": "Which address is in RFC 1918 private space?",
       "options": [
        "172.31.200.5",
        "172.15.200.5",
        "172.32.0.1",
        "192.169.1.1"
       ],
       "answer": 0,
       "explain": "The 172 private block is 172.16.0.0 – 172.31.255.255, so 172.31.200.5 is private. 172.15.x, 172.32.x and 192.169.x are all public space."
      },
      {
       "q": "A host shows 169.254.33.7/16. What most likely happened?",
       "options": [
        "It received a public address from the ISP",
        "It is using carrier-grade NAT space",
        "It was set to a documentation address",
        "It failed to get an address from DHCP"
       ],
       "answer": 3,
       "explain": "Hosts self-assign 169.254.0.0/16 when DHCP does not answer. ISP public addresses, CGN space (100.64.0.0/10) and documentation ranges look different."
      },
      {
       "q": "How many usable host addresses does a /23 provide?",
       "options": [
        "512",
        "254",
        "510",
        "1022"
       ],
       "answer": 2,
       "explain": "A /23 has 9 host bits: 2^9 = 512 addresses, minus network and broadcast = 510. 512 forgets the two reserved addresses, 254 is a /24 and 1022 is a /22."
      },
      {
       "q": "Why did CIDR replace classful addressing?",
       "options": [
        "Classful masks could not be written in binary or dotted decimal",
        "Fixed class sizes wasted addresses and table space",
        "Class C networks could not carry TCP traffic",
        "Routers could not forward multicast traffic"
       ],
       "answer": 1,
       "explain": "CIDR allows any prefix length, saving addresses and enabling summarisation. Masks were always binary, Class C carried TCP normally, and multicast is unrelated."
      },
      {
       "q": "Which range should appear in a training diagram so it can never clash with a real network?",
       "options": [
        "192.168.100.0/24",
        "198.51.100.0/24",
        "100.64.0.0/10",
        "11.0.0.0/8"
       ],
       "answer": 1,
       "explain": "198.51.100.0/24 is reserved for documentation. 192.168.100.0/24 is private space that real networks use, 11.0.0.0/8 is real public space, and 100.64.0.0/10 is used by ISPs for carrier-grade NAT."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l2",
   "title": "Subnetting Step by Step",
   "subtitle": "The block-size method with fully worked examples",
   "minutes": 32,
   "objectives": [
    "Find the network, broadcast and usable range for any IPv4 address and prefix",
    "Choose a prefix that meets a host or subnet requirement",
    "Split a network into equal subnets and list their ranges"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "**Subnetting** means borrowing host bits to create more, smaller networks. It is the single most tested and most used skill in addressing. You do not need long binary conversions every time — the **block-size method** below lets you work most problems in your head in under a minute."
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "Subnets created",
       "expr": "subnets = 2^s",
       "meaning": "s = bits borrowed. Borrowing 2 bits from a /24 gives 2^2 = 4 subnets of /26."
      },
      {
       "name": "Usable hosts",
       "expr": "hosts = 2^h − 2",
       "meaning": "h = host bits left. A /26 leaves 6 host bits: 64 − 2 = 62 hosts."
      },
      {
       "name": "Block size",
       "expr": "block = 256 − mask value in the interesting octet",
       "meaning": "For 255.255.255.224 the block is 256 − 224 = 32: subnets start at 0, 32, 64, 96…"
      }
     ],
     "title": "The three formulas you need"
    },
    {
     "type": "table",
     "head": [
      "Prefix",
      "Mask",
      "Block size",
      "Usable hosts"
     ],
     "rows": [
      [
       "/24",
       "255.255.255.0",
       "256",
       "254"
      ],
      [
       "/25",
       "255.255.255.128",
       "128",
       "126"
      ],
      [
       "/26",
       "255.255.255.192",
       "64",
       "62"
      ],
      [
       "/27",
       "255.255.255.224",
       "32",
       "30"
      ],
      [
       "/28",
       "255.255.255.240",
       "16",
       "14"
      ],
      [
       "/29",
       "255.255.255.248",
       "8",
       "6"
      ],
      [
       "/30",
       "255.255.255.252",
       "4",
       "2"
      ],
      [
       "/31",
       "255.255.255.254",
       "2",
       "2 (point-to-point only)"
      ]
     ],
     "title": "Prefix cheat sheet (last octet)"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Find the interesting octet",
       "text": "The octet where the mask is neither 255 nor 0. For /27 that is the fourth octet; for /20 it is the third."
      },
      {
       "title": "Find the block size",
       "text": "256 minus the mask value in that octet."
      },
      {
       "title": "Find the network address",
       "text": "The highest multiple of the block size that is less than or equal to the address's value in that octet. Octets to the right become 0."
      },
      {
       "title": "Find the broadcast address",
       "text": "Next network address minus 1 (octets to the right become 255)."
      },
      {
       "title": "List the usable range",
       "text": "Network + 1 up to broadcast − 1."
      }
     ],
     "title": "The block-size method"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "Interesting octet: 4th. Mask 255.255.255.224 → block **32**. Multiples of 32: 0, 32, **64**, 96. 77 falls in the 64 block. **Network** 192.168.50.64 · **Broadcast** 192.168.50.95 (96 − 1) · **Usable** 192.168.50.65 – 192.168.50.94 · **30 hosts**.",
     "title": "Worked example 1 — 192.168.50.77/27"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "/20 = 255.255.240.0, so the interesting octet is the 3rd and the block is 256 − 240 = **16**. Multiples of 16: 0, 16, **32**, 48. 45 falls in the 32 block. **Network** 172.16.32.0 · **Broadcast** 172.16.47.255 · **Usable** 172.16.32.1 – 172.16.47.254 · 2^12 − 2 = **4,094 hosts**.",
     "title": "Worked example 2 — 172.16.45.200/20"
    },
    {
     "type": "table",
     "head": [
      "Subnet",
      "Network",
      "First host",
      "Last host",
      "Broadcast"
     ],
     "rows": [
      [
       "1",
       "192.168.10.0/26",
       "192.168.10.1",
       "192.168.10.62",
       "192.168.10.63"
      ],
      [
       "2",
       "192.168.10.64/26",
       "192.168.10.65",
       "192.168.10.126",
       "192.168.10.127"
      ],
      [
       "3",
       "192.168.10.128/26",
       "192.168.10.129",
       "192.168.10.190",
       "192.168.10.191"
      ],
      [
       "4",
       "192.168.10.192/26",
       "192.168.10.193",
       "192.168.10.254",
       "192.168.10.255"
      ]
     ],
     "title": "Splitting 192.168.10.0/24 into four /26 subnets"
    },
    {
     "type": "tree",
     "title": "Each borrowed bit halves the block",
     "root": {
      "label": "192.168.10.0/24",
      "text": "256 addresses",
      "children": [
       {
        "label": "192.168.10.0/25",
        "text": "128 addresses",
        "children": [
         {
          "label": "192.168.10.0/26",
          "text": "hosts .1–.62"
         },
         {
          "label": "192.168.10.64/26",
          "text": "hosts .65–.126"
         }
        ]
       },
       {
        "label": "192.168.10.128/25",
        "text": "128 addresses",
        "children": [
         {
          "label": "192.168.10.128/26",
          "text": "hosts .129–.190"
         },
         {
          "label": "192.168.10.192/26",
          "text": "hosts .193–.254"
         }
        ]
       }
      ]
     },
     "caption": "The four /26 leaves are exactly the subnets in the table above. Borrowing one more bit would split each of them into two /27s of 32 addresses."
    },
    {
     "type": "tool",
     "tool": "subnet",
     "title": "Practise: check the worked examples",
     "prompt": "Enter 192.168.50.77/27 and then 172.16.45.200/20. Confirm the network, broadcast and host count match the worked examples, then try 10.9.130.14/18 on your own before checking."
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Hosts needed",
       "text": "e.g. 50 devices + growth"
      },
      {
       "label": "Host bits",
       "text": "smallest h where 2^h − 2 ≥ need → h = 6"
      },
      {
       "label": "Prefix",
       "text": "32 − 6 = /26"
      },
      {
       "label": "Block size",
       "text": "64"
      },
      {
       "label": "Ranges",
       "text": "write network, gateway, usable range and broadcast"
      }
     ],
     "title": "From a requirement to a subnet"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "1) Forgetting the −2 for network and broadcast. 2) Choosing a network address that is not a multiple of the block size (192.168.10.40/27 is **not** a network — .32 is). 3) Assigning the network or broadcast address to a host. 4) Using the right block size in the wrong octet on prefixes shorter than /24.",
     "title": "The four classic subnetting mistakes"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# interface GigabitEthernet0/0",
      "R1(config-if)# ip address 192.168.10.1 255.255.255.192",
      "R1(config-if)# no shutdown",
      "R1(config-if)# interface GigabitEthernet0/1",
      "R1(config-if)# ip address 192.168.10.65 255.255.255.192",
      "R1(config-if)# no shutdown",
      "R1(config-if)# interface GigabitEthernet0/2",
      "R1(config-if)# ip address 192.168.10.129 255.255.255.192",
      "R1(config-if)# no shutdown",
      "R1(config-if)# end",
      "R1# show ip route connected",
      "C        192.168.10.0/26 is directly connected, GigabitEthernet0/0",
      "C        192.168.10.64/26 is directly connected, GigabitEthernet0/1",
      "C        192.168.10.128/26 is directly connected, GigabitEthernet0/2"
     ],
     "title": "Applying subnets to router interfaces",
     "note": "Each interface takes the first usable address of its /26 as the gateway for that subnet. The router refuses overlapping subnets on two interfaces — a useful safety net."
    },
    {
     "type": "scenario",
     "situation": "A new lab needs 50 PCs today and the lab manager expects 8 more next year. You must use the smallest subnet that fits.",
     "options": [
      {
       "text": "/27",
       "feedback": "A /27 gives only 30 usable hosts — too small even today.",
       "best": false
      },
      {
       "text": "/26",
       "feedback": "Correct. 62 usable hosts covers 58 devices plus the gateway with a little room left.",
       "best": true
      },
      {
       "text": "/25",
       "feedback": "126 hosts works but wastes space when a /26 fits.",
       "best": false
      },
      {
       "text": "/28",
       "feedback": "A /28 holds only 14 hosts.",
       "best": false
      }
     ],
     "title": "Choosing a prefix"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Block size = 256 − the mask value in the interesting octet; networks start at multiples of it.",
      "Broadcast = next network − 1; usable hosts sit between network and broadcast.",
      "Pick the smallest prefix whose 2^h − 2 covers the hosts plus growth.",
      "Check boundaries: an address that is not a multiple of the block size is not a network address."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the network address of 10.1.1.100/26?",
       "options": [
        "10.1.1.96",
        "10.1.1.0",
        "10.1.1.100",
        "10.1.1.64"
       ],
       "answer": 3,
       "explain": "Block size 64: 0, 64, 128. 100 falls in the 64 block. 10.1.1.96 would be the answer for /27, 10.1.1.0 for /24 or /25, and 10.1.1.100 is a host address."
      },
      {
       "q": "What is the broadcast address of 192.168.7.130/28?",
       "options": [
        "192.168.7.143",
        "192.168.7.255",
        "192.168.7.135",
        "192.168.7.159"
       ],
       "answer": 0,
       "explain": "Block 16: the 128 block covers .128–.143, so the broadcast is .143. .255 would be /24, .135 is /29 and .159 is /27."
      },
      {
       "q": "Which prefix is the smallest that supports 25 hosts?",
       "options": [
        "/28",
        "/26",
        "/27",
        "/29"
       ],
       "answer": 2,
       "explain": "A /27 gives 30 usable hosts. /28 gives 14 and /29 gives 6 (both too small); /26 works but is larger than needed."
      },
      {
       "q": "How many /27 subnets fit inside one /24?",
       "options": [
        "4",
        "16",
        "8",
        "32"
       ],
       "answer": 2,
       "explain": "Borrowing 3 bits (27 − 24) gives 2^3 = 8 subnets. 4 would be /26, 16 would be /28, and 32 is the block size, not the count."
      },
      {
       "q": "A PC is configured as 172.16.40.0/22 with gateway 172.16.40.1. Why does it fail?",
       "options": [
        "172.16.40.0 is the broadcast address of its /22",
        "172.16.40.0 is the network address of its /22",
        "The gateway must be the last usable address",
        "A /22 mask is not allowed on a host"
       ],
       "answer": 1,
       "explain": "For /22 the third-octet block is 4, so the subnet is 172.16.40.0 – 172.16.43.255; .40.0 is the network address and cannot be a host. The broadcast is 172.16.43.255, gateways may be any usable address, and /22 is a valid host mask."
      },
      {
       "q": "For 172.16.45.200/20, what is the last usable host?",
       "options": [
        "172.16.47.254",
        "172.16.45.254",
        "172.16.63.254",
        "172.16.47.255"
       ],
       "answer": 0,
       "explain": "Block 16 in the third octet: the subnet runs 172.16.32.0 – 172.16.47.255, so the last host is .47.254. .45.254 ignores the /20, .63.254 uses the wrong block, and .47.255 is the broadcast."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l3",
   "title": "VLSM Design and Verifying Host Configuration",
   "subtitle": "Right-sized subnets for every segment — then proving each host is set up correctly",
   "minutes": 30,
   "objectives": [
    "Design a VLSM plan that allocates the largest subnets first without overlap",
    "Document an addressing plan that others can follow",
    "Verify a host's IP, mask, gateway and DNS settings and spot common errors"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Real sites never need equal-sized subnets. A staff VLAN may need 100 addresses while a router-to-router link needs two. **Variable-length subnet masking (VLSM)** lets you cut one address block into differently sized subnets so nothing is wasted and the plan can still be summarised as one route."
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "List requirements",
       "text": "Every segment with its host count, including growth, gateways and infrastructure devices."
      },
      {
       "title": "Sort largest first",
       "text": "Big subnets have big block sizes; placing them first keeps every subnet on a valid boundary."
      },
      {
       "title": "Allocate from the start of the block",
       "text": "Give the largest segment the first network address; the next subnet starts right after its broadcast."
      },
      {
       "title": "Check boundaries",
       "text": "Every network address must be a multiple of its own block size."
      },
      {
       "title": "Record spare space",
       "text": "Note what is left so future growth comes from the same block."
      }
     ],
     "title": "The VLSM procedure"
    },
    {
     "type": "table",
     "head": [
      "Segment",
      "Hosts needed",
      "Prefix (usable)",
      "Subnet",
      "Usable range",
      "Broadcast"
     ],
     "rows": [
      [
       "Lab A",
       "100",
       "/25 (126)",
       "192.168.40.0/25",
       ".1 – .126",
       ".127"
      ],
      [
       "Lab B",
       "50",
       "/26 (62)",
       "192.168.40.128/26",
       ".129 – .190",
       ".191"
      ],
      [
       "Staff",
       "20",
       "/27 (30)",
       "192.168.40.192/27",
       ".193 – .222",
       ".223"
      ],
      [
       "Printers",
       "10",
       "/28 (14)",
       "192.168.40.224/28",
       ".225 – .238",
       ".239"
      ],
      [
       "Router link",
       "2",
       "/30 (2)",
       "192.168.40.240/30",
       ".241 – .242",
       ".243"
      ],
      [
       "Spare",
       "—",
       "/30 + /29",
       "192.168.40.244/30, 192.168.40.248/29",
       "—",
       "—"
      ]
     ],
     "title": "Worked VLSM: a university lab block 192.168.40.0/24"
    },
    {
     "type": "tool",
     "tool": "subnet",
     "title": "Check every VLSM subnet",
     "prompt": "Enter each subnet from the lab table (for example 192.168.40.192/27) and confirm the usable range and broadcast. Then enter 192.168.40.200/28 — the calculator reports the network as 192.168.40.192, proving .200 is not a valid /28 boundary."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If 192.168.40.128/25 and 192.168.40.192/27 both exist, the /27 sits inside the /25. Routers will prefer the longer prefix for some addresses and the shorter for others, producing \"half the hosts work\" faults. Always check new subnets against the plan before configuring them.",
     "title": "Overlap is the silent killer"
    },
    {
     "type": "tree",
     "title": "A non-overlapping hierarchy",
     "root": {
      "label": "10.0.0.0/8",
      "text": "Whole organisation (private)",
      "children": [
       {
        "label": "10.10.0.0/16",
        "text": "Dhaka head office",
        "children": [
         {
          "label": "10.10.10.0/24",
          "text": "Staff VLAN 10"
         },
         {
          "label": "10.10.20.0/23",
          "text": "Students VLAN 20"
         },
         {
          "label": "10.10.99.0/24",
          "text": "Management VLAN 99"
         }
        ]
       },
       {
        "label": "10.20.0.0/16",
        "text": "Chattogram warehouse",
        "children": [
         {
          "label": "10.20.8.0/22",
          "text": "Site block, VLSM inside"
         }
        ]
       },
       {
        "label": "10.200.0.0/16",
        "text": "Cloud networks",
        "children": [
         {
          "label": "10.200.0.0/20",
          "text": "Production"
         },
         {
          "label": "10.200.16.0/20",
          "text": "Test"
         }
        ]
       }
      ]
     },
     "caption": "Plan top-down: one summarisable block per site, VLSM inside each site and a separate block for cloud networks. Each site is then advertised as a single route and no two plans can collide. Values are an illustrative plan."
    },
    {
     "type": "case",
     "title": "A Chattogram warehouse addressing plan",
     "context": "A logistics company is opening a bonded warehouse near Chattogram port. The IT team has been given **172.20.8.0/22** for the site. Requirements: handheld scanners and floor Wi-Fi 300 hosts; office staff 100; CCTV cameras 50; IP phones 25; switch and AP management 12; two router links to two WAN providers.",
     "questions": [
      "Which prefix does each segment need?",
      "Allocate the subnets in VLSM order and give each network address.",
      "How much of the /22 is left for growth, and in what blocks?"
     ],
     "answer": "Largest first: **Scanners/Wi-Fi** /23 (510) → 172.20.8.0/23 (8.1 – 9.254). **Office** /25 (126) → 172.20.10.0/25. **CCTV** /26 (62) → 172.20.10.128/26. **Voice** /27 (30) → 172.20.10.192/27. **Management** /28 (14) → 172.20.10.224/28. **WAN 1** /30 → 172.20.10.240/30 and **WAN 2** /30 → 172.20.10.244/30 (or /31s on routers that support them). Spare: 172.20.10.248/29 and the whole of **172.20.11.0/24** — enough to add another /24 VLAN later while the site is still summarised as one 172.20.8.0/22 route."
    },
    {
     "type": "template",
     "title": "IPv4 addressing plan",
     "purpose": "One row per subnet. Keep it with the site documentation and update it before every change.",
     "columns": [
      "VLAN / segment",
      "Purpose",
      "Subnet / prefix",
      "Gateway",
      "DHCP range",
      "Reserved / static",
      "Notes"
     ],
     "example": [
      [
       "10",
       "Office staff",
       "172.20.10.0/25",
       "172.20.10.1",
       ".20 – .120",
       ".2 – .19 printers, servers",
       "Growth to 110 users expected"
      ]
     ],
     "rows": 8
    },
    {
     "type": "text",
     "text": "Once a plan exists, every host must match it. Most \"network\" tickets on day one turn out to be one wrong field on a host: a mistyped mask, a gateway from another subnet, or a stale DNS server. Verification means checking each field against the plan, not just checking that *something* is filled in."
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ ip -4 addr show eth0",
      "    inet 172.20.10.57/25 brd 172.20.10.127 scope global dynamic eth0",
      "$ ip route",
      "default via 172.20.10.1 dev eth0 proto dhcp metric 100",
      "172.20.10.0/25 dev eth0 proto kernel scope link src 172.20.10.57",
      "$ resolvectl status eth0 | grep 'DNS Servers'",
      "       DNS Servers: 172.20.10.10",
      "$ ping -c 2 172.20.10.1",
      "2 packets transmitted, 2 received, 0% packet loss"
     ],
     "title": "Verifying a Linux host against the plan",
     "note": "Address, prefix and broadcast match the plan for VLAN 10; the gateway is inside the subnet; DNS is set; the gateway answers."
    },
    {
     "type": "keypoints",
     "items": [
      "The IP address is a **usable** address in the planned subnet (not network, not broadcast).",
      "The mask/prefix **matches the plan** exactly — the same on every host in the subnet.",
      "The default gateway is **inside the same subnet** and is the router's real interface address.",
      "DNS servers are reachable and are the ones in the plan.",
      "No `169.254.x.x` address — that means DHCP failed.",
      "No duplicate address warnings in the OS logs."
     ],
     "title": "What \"correct\" looks like on a host"
    },
    {
     "type": "scenario",
     "situation": "PCs in VLAN 20 should be 192.168.40.128/26 with gateway 192.168.40.129. PC-7 is set to 192.168.40.170 with mask 255.255.255.240 (/28). It can reach PCs at .161–.174 but not the gateway or anything else.",
     "options": [
      {
       "text": "Correct PC-7's mask to 255.255.255.192 (/26) to match the plan",
       "feedback": "Correct. With /28 the PC believes its subnet is .160–.175, so the gateway at .129 looks remote and unreachable. The planned /26 puts .129 back on-link.",
       "best": true
      },
      {
       "text": "Change PC-7's gateway to 192.168.40.161 so it is inside its /28",
       "feedback": "That address is another host, not the router; the real fault is the mask.",
       "best": false
      },
      {
       "text": "Replace PC-7's network card",
       "feedback": "Reaching some local hosts proves the NIC works; this is a configuration error.",
       "best": false
      },
      {
       "text": "Move PC-7 to VLAN 10",
       "feedback": "The PC belongs in VLAN 20 by plan; moving it hides the mistake and breaks policy.",
       "best": false
      }
     ],
     "title": "Half the subnet works"
    },
    {
     "type": "checklist",
     "title": "Host configuration verification checklist",
     "items": [
      "IP address is inside the planned subnet and is not the network or broadcast address",
      "Prefix/mask matches the addressing plan",
      "Default gateway is in the same subnet and answers ping",
      "ARP/neighbour table shows the gateway's MAC address",
      "DNS servers match the plan and resolve an internal and an external name",
      "Address source is as planned (DHCP lease or documented static)",
      "No 169.254.x.x or duplicate-address warnings",
      "Trace to a remote subnet leaves through the expected gateway"
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "VLSM sizes each subnet to its need inside one block that can still be summarised.",
      "Allocate largest first so every subnet lands on its own block boundary.",
      "Overlapping subnets cause \"half the hosts work\" faults — check every new subnet against the plan.",
      "Verify hosts field by field: usable address, exact mask, on-link gateway, planned DNS."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "When designing VLSM, why allocate the largest subnet first?",
       "options": [
        "Routers require subnets in descending order",
        "Small subnets cannot use private addresses",
        "It reduces the number of broadcast addresses",
        "It keeps every subnet aligned to its block boundary"
       ],
       "answer": 3,
       "explain": "Placing large blocks first avoids gaps and misaligned networks. Routers do not care about configuration order, small subnets can be private, and every subnet has one broadcast regardless."
      },
      {
       "q": "Which pair of subnets overlaps?",
       "options": [
        "10.5.0.0/24 and 10.5.1.0/24",
        "10.5.2.0/25 and 10.5.2.128/25",
        "10.5.0.0/23 and 10.5.1.0/24",
        "10.5.4.0/23 and 10.5.6.0/23"
       ],
       "answer": 2,
       "explain": "10.5.0.0/23 covers 10.5.0.0 – 10.5.1.255, which contains 10.5.1.0/24. The other pairs are adjacent but separate."
      },
      {
       "q": "A host has 192.168.40.200/27 and gateway 192.168.40.129. What is wrong?",
       "options": [
        "The gateway is outside the host's subnet",
        "The host address is the broadcast address of its /27",
        "A /27 cannot be used on hosts",
        "The gateway must end in .254"
       ],
       "answer": 0,
       "explain": "192.168.40.200/27 lives in .192 – .223, so .129 is not on the local subnet and cannot be reached by ARP. .200 is a normal host address, /27 is valid and gateways need not end in .254."
      },
      {
       "q": "A Windows PC shows 169.254.12.9. What should you check first?",
       "options": [
        "Whether the DNS server name is spelled correctly",
        "Whether DHCP is reachable from the PC's VLAN",
        "Whether the default route exists on the core",
        "Whether the PC's browser proxy is configured"
       ],
       "answer": 1,
       "explain": "A 169.254 address means no DHCP offer arrived, so check the port's VLAN, the DHCP server or relay. DNS, core routes and proxies matter only after the PC has an address."
      },
      {
       "q": "A site was given 10.30.0.0/22. Which subnet can be part of it?",
       "options": [
        "10.30.4.0/24",
        "10.30.0.0/21",
        "10.31.0.0/24",
        "10.30.3.0/24"
       ],
       "answer": 3,
       "explain": "10.30.0.0/22 spans 10.30.0.0 – 10.30.3.255, so 10.30.3.0/24 fits. 10.30.4.0 is outside, a /21 is larger than the /22, and 10.31.x is a different block."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l4",
   "title": "IPv6 Fundamentals: Format, Compression and Address Types",
   "subtitle": "Reading, writing and recognising 128-bit addresses",
   "minutes": 26,
   "objectives": [
    "Write IPv6 addresses in full and compressed form correctly",
    "Identify global unicast, unique local, link-local, multicast, loopback and unspecified addresses",
    "Explain the /48 – /64 prefix structure used by most organisations"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "IPv4's 4.3 billion addresses ran out at the regional registries years ago; NAT stretched them further but made networks more complex. **IPv6** uses **128-bit** addresses — enough for every device to have a globally unique address — and drops broadcast entirely. Large mobile networks, content providers and clouds already carry much of their traffic over IPv6, so every junior engineer must read it fluently."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "128 bits written as **eight groups of four hexadecimal digits** (hextets) separated by colons, e.g. `2001:0db8:0acd:0010:0000:0000:0000:0001`. A **prefix length** such as `/64` marks the network part, just like CIDR in IPv4.",
     "title": "IPv6 address format"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Drop leading zeros",
       "text": "In each hextet, remove zeros at the front: `0db8` → `db8`, `0010` → `10`, `0000` → `0`."
      },
      {
       "title": "Replace one run of zero hextets with ::",
       "text": "The longest run of consecutive all-zero hextets becomes `::`."
      },
      {
       "title": "Only once",
       "text": "`::` may appear only once — otherwise the reader cannot tell how many zeros each one hides."
      },
      {
       "title": "Tie-break and style",
       "text": "If two runs are equal, compress the first (leftmost). Do not use `::` for a single zero hextet; write letters in lowercase."
      }
     ],
     "title": "Compressing an IPv6 address"
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "`2001:0db8:0acd:0010:0000:0000:0000:0001` → **`2001:db8:acd:10::1`**.\n`2001:0db8:0000:0000:00a0:0000:0000:0001` has two equal runs of two zero hextets, so the first is compressed → **`2001:db8::a0:0:0:1`**.\n`fe80:0000:0000:0000:0000:0000:0000:0001` → **`fe80::1`**.",
     "title": "Compression in practice"
    },
    {
     "type": "table",
     "head": [
      "Type",
      "Prefix",
      "Scope and use"
     ],
     "rows": [
      [
       "Global unicast (GUA)",
       "2000::/3",
       "Publicly routable; most begin with 2 or 3"
      ],
      [
       "Unique local (ULA)",
       "fc00::/7 (fd00::/8 in practice)",
       "Private, inside an organisation; similar role to RFC 1918"
      ],
      [
       "Link-local",
       "fe80::/10",
       "Only on one link; every IPv6 interface has one; used by routing protocols and as next hop"
      ],
      [
       "Multicast",
       "ff00::/8",
       "One-to-many; ff02::1 all nodes, ff02::2 all routers"
      ],
      [
       "Loopback",
       "::1/128",
       "The host itself"
      ],
      [
       "Unspecified",
       "::/128",
       "\"No address yet\" — source during address set-up"
      ],
      [
       "Documentation",
       "2001:db8::/32",
       "Examples and training only"
      ]
     ],
     "title": "IPv6 address types"
    },
    {
     "type": "layers",
     "items": [
      {
       "label": "Global routing prefix · 48 bits",
       "parts": [
        "Assigned by a provider or registry",
        "Example: 2001:db8:acad::/48"
       ]
      },
      {
       "label": "Subnet ID · 16 bits",
       "parts": [
        "Chosen by the organisation",
        "65,536 possible /64 subnets per site"
       ]
      },
      {
       "label": "Interface ID · 64 bits",
       "parts": [
        "Identifies the interface on the subnet",
        "Random, stable-private, EUI-64 or manual"
       ]
      }
     ],
     "title": "A typical global unicast address (left to right, top first)"
    },
    {
     "type": "tree",
     "title": "An IPv6 site plan from a /48",
     "root": {
      "label": "2001:db8:acad::/48",
      "text": "Campus allocation",
      "children": [
       {
        "label": "2001:db8:acad:100::/56",
        "text": "Building A",
        "children": [
         {
          "label": "2001:db8:acad:110::/64",
          "text": "Staff"
         },
         {
          "label": "2001:db8:acad:120::/64",
          "text": "Voice"
         }
        ]
       },
       {
        "label": "2001:db8:acad:200::/56",
        "text": "Building B",
        "children": [
         {
          "label": "2001:db8:acad:210::/64",
          "text": "Staff"
         }
        ]
       },
       {
        "label": "2001:db8:acad:ff00::/56",
        "text": "Infrastructure: loopbacks /128, links /127"
       }
      ]
     },
     "caption": "Nibble-aligned boundaries keep the plan readable: a /56 per building (the first two hex digits of the fourth hextet) and a /64 per VLAN. A /48 holds 256 such buildings."
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "Subnets in a /48",
       "expr": "2^(64 − 48) = 2^16 = 65,536",
       "meaning": "A single site allocation holds 65,536 standard /64 subnets."
      },
      {
       "name": "Addresses in a /64",
       "expr": "2^64 ≈ 1.8 × 10^19",
       "meaning": "Never \"run out\" on a LAN; /64 is the standard LAN size and is required for SLAAC."
      },
      {
       "name": "Subnets in a /56",
       "expr": "2^(64 − 56) = 256",
       "meaning": "A common home or small-office delegation from an ISP."
      }
     ],
     "title": "IPv6 sizing"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "IPv4",
       "items": [
        "32-bit, dotted decimal",
        "Broadcast exists",
        "ARP maps IP to MAC",
        "Header 20–60 bytes with checksum",
        "DHCP for automatic addressing",
        "NAT is everywhere"
       ]
      },
      {
       "title": "IPv6",
       "items": [
        "128-bit, hexadecimal with colons",
        "No broadcast — multicast instead",
        "Neighbor Discovery (ICMPv6) replaces ARP",
        "Fixed 40-byte header, no header checksum",
        "SLAAC and/or DHCPv6",
        "Global addresses end to end; firewalls still required"
       ]
      }
     ],
     "title": "IPv4 vs IPv6 at a glance"
    },
    {
     "type": "packet",
     "title": "IPv6 header (40 bytes, fixed)",
     "width": 64,
     "fields": [
      {
       "label": "Version",
       "bits": 4
      },
      {
       "label": "Traffic class",
       "bits": 8
      },
      {
       "label": "Flow label",
       "bits": 20
      },
      {
       "label": "Payload length",
       "bits": 16
      },
      {
       "label": "Next header",
       "bits": 8
      },
      {
       "label": "Hop limit",
       "bits": 8
      },
      {
       "label": "Source address",
       "bits": 128
      },
      {
       "label": "Destination address",
       "bits": 128
      }
     ],
     "caption": "No header checksum and no fragmentation fields: options move into extension headers chained through Next header. The two 128-bit addresses take 32 of the 40 bytes."
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Expect a link-local address **plus** one or more global (or unique local) addresses, and often temporary privacy addresses too. Seeing three IPv6 addresses on one laptop is normal, not a misconfiguration.",
     "title": "Every interface has several IPv6 addresses"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1# show ipv6 interface brief",
      "GigabitEthernet0/0     [up/up]",
      "    FE80::1",
      "    2001:DB8:ACAD:10::1",
      "GigabitEthernet0/1     [up/up]",
      "    FE80::21A:2BFF:FE3C:4D5E",
      "    2001:DB8:ACAD:20:21A:2BFF:FE3C:4D5E",
      "GigabitEthernet0/2     [administratively down/down]",
      "    unassigned"
     ],
     "title": "Reading IPv6 addresses on a router and a host",
     "note": "IOS-style devices print IPv6 in uppercase; hosts usually print lowercase. Both are the same address."
    },
    {
     "type": "scenario",
     "situation": "A colleague's addressing sheet lists four server addresses. Which one must be fixed before it is configured?",
     "options": [
      {
       "text": "2001:db8:acad:10::25",
       "feedback": "Valid: one `::` hiding three zero hextets.",
       "best": false
      },
      {
       "text": "fd12:3456:789a:1::25",
       "feedback": "Valid unique local address.",
       "best": false
      },
      {
       "text": "2001:db8::10::25",
       "feedback": "Correct — this one is invalid. Two `::` make the address ambiguous; the number of hidden zeros cannot be worked out.",
       "best": true
      },
      {
       "text": "2001:db8:0:10:0:0:0:25",
       "feedback": "Valid but not compressed; it could be written 2001:db8:0:10::25.",
       "best": false
      }
     ],
     "title": "Spot the invalid address"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "IPv6 addresses are 128 bits in eight hextets; drop leading zeros and use :: once, for the longest zero run.",
      "Know the prefixes: 2000::/3 global, fd00::/8 unique local, fe80::/10 link-local, ff00::/8 multicast, 2001:db8::/32 documentation.",
      "Sites usually receive a /48 or /56; every LAN gets a /64.",
      "There is no broadcast in IPv6, and several addresses per interface are normal."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the correct compressed form of 2001:0db8:0000:0042:0000:0000:0000:0001?",
       "options": [
        "2001:db8::42::1",
        "2001:db8:0:42:0::1",
        "2001:db8:0:42::1",
        "2001:db8::42:0:0:0:1"
       ],
       "answer": 2,
       "explain": "Leading zeros drop and the longest zero run (three hextets) becomes ::. The first option uses :: twice, which is invalid; the second does not compress the longest run fully; and the fourth compresses the shorter run instead of the longest."
      },
      {
       "q": "Which prefix identifies link-local IPv6 addresses?",
       "options": [
        "ff00::/8",
        "fc00::/7",
        "2001:db8::/32",
        "fe80::/10"
       ],
       "answer": 3,
       "explain": "Link-local addresses use fe80::/10. ff00::/8 is multicast, fc00::/7 is unique local and 2001:db8::/32 is documentation space."
      },
      {
       "q": "What replaces IPv4 broadcast in IPv6?",
       "options": [
        "Anycast to the nearest router on the link",
        "Multicast groups such as ff02::1",
        "Unicast to every host in turn",
        "Broadcast to ffff::/16"
       ],
       "answer": 1,
       "explain": "IPv6 has no broadcast; all-nodes multicast ff02::1 and other groups serve that role. Anycast targets the nearest of several interfaces, sequential unicast is not used, and ffff::/16 is not a broadcast range."
      },
      {
       "q": "An ISP delegates a /48 to a campus. How many /64 subnets can the campus create?",
       "options": [
        "65,536",
        "256",
        "4,096",
        "16,384"
       ],
       "answer": 0,
       "explain": "64 − 48 = 16 bits of subnet ID: 2^16 = 65,536. 256 would be a /56, 4,096 a /52 and 16,384 a /50."
      },
      {
       "q": "Which address is a unique local address?",
       "options": [
        "fe80::abcd:12",
        "2001:db8:acad:12::10",
        "ff02::2",
        "fd00:abcd:12:5::10"
       ],
       "answer": 3,
       "explain": "fd00::/8 sits inside fc00::/7, the unique local range. fe80:: is link-local, 2001:db8:: is documentation global space and ff02::2 is the all-routers multicast group."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l5",
   "title": "IPv6 Configuration: EUI-64, SLAAC, DHCPv6 and Dual Stack",
   "subtitle": "How IPv6 hosts get addresses — and how to run IPv4 and IPv6 side by side",
   "minutes": 30,
   "objectives": [
    "Build an EUI-64 interface ID from a MAC address",
    "Compare SLAAC, stateless DHCPv6 and stateful DHCPv6 and the RA flags that select them",
    "Configure and verify IPv6 addressing on a router and explain dual stack"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "IPv6 was designed so hosts can configure themselves. A router announces the subnet prefix; hosts build their own addresses and check nobody else uses them. The machinery behind this is **Neighbor Discovery Protocol (NDP)**, which runs over ICMPv6 and also replaces ARP."
    },
    {
     "type": "table",
     "head": [
      "ICMPv6 type",
      "Message",
      "Purpose"
     ],
     "rows": [
      [
       "133",
       "Router Solicitation (RS)",
       "Host asks routers to announce themselves (sent to ff02::2)"
      ],
      [
       "134",
       "Router Advertisement (RA)",
       "Router announces prefix, flags and itself as default gateway"
      ],
      [
       "135",
       "Neighbor Solicitation (NS)",
       "\"Who has this IPv6 address?\" — address resolution and duplicate address detection"
      ],
      [
       "136",
       "Neighbor Advertisement (NA)",
       "Reply with the MAC address"
      ],
      [
       "137",
       "Redirect",
       "Tells a host a better first hop exists"
      ]
     ],
     "title": "Neighbor Discovery messages"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Split the MAC in half",
       "text": "`001A2B` | `3C4D5E`"
      },
      {
       "title": "Insert FFFE in the middle",
       "text": "`001A2B` `FFFE` `3C4D5E` → 64 bits."
      },
      {
       "title": "Flip the 7th bit of the first byte",
       "text": "`00` = 00000000 → 00000010 = `02`. The interface ID is `021A:2BFF:FE3C:4D5E`."
      },
      {
       "title": "Add the /64 prefix",
       "text": "With prefix 2001:db8:acad:20::/64 the address is `2001:db8:acad:20:21a:2bff:fe3c:4d5e`."
      }
     ],
     "title": "Building an EUI-64 interface ID from MAC 00:1A:2B:3C:4D:5E"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Because EUI-64 embeds the hardware MAC, a laptop using it could be tracked across networks. Modern operating systems therefore create **random or stable-private interface IDs** by default. You will still see EUI-64 on routers and some IoT devices — and in exams.",
     "title": "EUI-64 is now mostly a router thing"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "SLAAC only",
       "items": [
        "RA carries prefix with A flag set",
        "Host builds its own address",
        "DNS server can be sent in the RA (RDNSS option)",
        "Default gateway = router's link-local address"
       ]
      },
      {
       "title": "Stateless DHCPv6 (SLAAC + DHCPv6)",
       "items": [
        "RA: A flag set, O flag (other config) set",
        "Address from SLAAC",
        "DNS and domain from DHCPv6",
        "DHCPv6 server keeps no address leases"
       ]
      },
      {
       "title": "Stateful DHCPv6",
       "items": [
        "RA: M flag (managed) set",
        "Address assigned and recorded by DHCPv6",
        "Gateway still learned from the RA",
        "Some mobile operating systems do not support it — plan carefully"
       ]
      }
     ],
     "title": "Three ways a host gets IPv6 settings"
    },
    {
     "type": "sequence",
     "title": "SLAAC from power-on to first packet",
     "actors": [
      "Host",
      "Router R1",
      "Other nodes"
     ],
     "steps": [
      {
       "from": 0,
       "to": 0,
       "label": "Build fe80:: link-local",
       "note": "tentative until DAD passes"
      },
      {
       "from": 0,
       "to": 2,
       "label": "NS (DAD) from ::",
       "note": "to solicited-node multicast"
      },
      {
       "from": 0,
       "to": 1,
       "label": "RS to ff02::2"
      },
      {
       "from": 1,
       "to": 0,
       "label": "RA with prefix, A=1",
       "note": "prefix 2001:db8:acad:10::/64",
       "reply": true
      },
      {
       "from": 0,
       "to": 0,
       "label": "Build global address",
       "note": "prefix + random interface ID"
      },
      {
       "from": 0,
       "to": 2,
       "label": "NS (DAD) for the global address"
      },
      {
       "from": 0,
       "to": 0,
       "label": "Default route via fe80::1",
       "note": "learned from the RA"
      }
     ],
     "caption": "Silence after a duplicate address detection probe means the address is unique. The default gateway comes only from the RA, even when DHCPv6 supplies other settings."
    },
    {
     "type": "sequence",
     "title": "Stateful DHCPv6 (M flag set)",
     "actors": [
      "Host",
      "Router R1",
      "DHCPv6 server"
     ],
     "steps": [
      {
       "from": 1,
       "to": 0,
       "label": "RA: M=1, O=1",
       "note": "get addresses from DHCPv6"
      },
      {
       "from": 0,
       "to": 2,
       "label": "Solicit to ff02::1:2",
       "note": "UDP 546 → 547"
      },
      {
       "from": 2,
       "to": 0,
       "label": "Advertise",
       "reply": true
      },
      {
       "from": 0,
       "to": 2,
       "label": "Request"
      },
      {
       "from": 2,
       "to": 0,
       "label": "Reply: address, DNS, lease",
       "reply": true
      },
      {
       "from": 0,
       "to": 0,
       "label": "Default route via fe80::1",
       "note": "learned from the RA, not DHCPv6"
      }
     ],
     "caption": "Four messages — Solicit, Advertise, Request, Reply — on UDP 546/547. If the server sits in another subnet the router relays them (`ipv6 dhcp relay destination`). The default gateway still comes only from the RA."
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# ipv6 unicast-routing",
      "R1(config)# interface GigabitEthernet0/0",
      "R1(config-if)# ipv6 address 2001:db8:acad:10::1/64",
      "R1(config-if)# ipv6 address fe80::1 link-local",
      "R1(config-if)# no shutdown",
      "R1(config-if)# interface GigabitEthernet0/1",
      "R1(config-if)# ipv6 address 2001:db8:acad:20::/64 eui-64",
      "R1(config-if)# ipv6 nd other-config-flag",
      "R1(config-if)# no shutdown"
     ],
     "title": "Configuring IPv6 on a router",
     "note": "`ipv6 unicast-routing` makes the device forward IPv6 and send RAs. A manual link-local such as fe80::1 makes the gateway easy to recognise. `other-config-flag` sets the O flag so hosts on Gi0/1 ask DHCPv6 for DNS (stateless DHCPv6)."
    },
    {
     "type": "cli",
     "device": "Linux host",
     "lines": [
      "$ ip -6 addr show eth0",
      "    inet6 2001:db8:acad:10:9c4e:51ff:fe2a:7b11/64 scope global dynamic mngtmpaddr",
      "    inet6 fe80::9c4e:51ff:fe2a:7b11/64 scope link",
      "$ ip -6 route | grep default",
      "default via fe80::1 dev eth0 proto ra metric 100",
      "$ ping -c 2 2001:db8:acad:10::1",
      "2 packets transmitted, 2 received, 0% packet loss"
     ],
     "title": "Verifying from a Linux host",
     "note": "`proto ra` proves the default route came from a Router Advertisement; the next hop is the router's link-local fe80::1."
    },
    {
     "type": "text",
     "text": "**Dual stack** means every device runs IPv4 and IPv6 at the same time, each with its own addresses, routes and policies. It is the most common way organisations adopt IPv6: nothing breaks for IPv4-only services, and IPv6 traffic grows as applications and providers support it. Modern hosts try IPv6 first and fall back to IPv4 within a fraction of a second if IPv6 is slow (the \"happy eyeballs\" approach)."
    },
    {
     "type": "keypoints",
     "items": [
      "Plan IPv6 per VLAN the same way you plan IPv4: one /64 per VLAN, recorded in the addressing plan.",
      "Apply equivalent **security policy** to both stacks — an open IPv6 path around an IPv4 firewall is a classic hole.",
      "Monitor both: a broken IPv6 path can slow every website even when IPv4 works.",
      "Where IPv4 is scarce, **IPv6-only** and **IPv6-mostly** networks are growing: NAT64/DNS64 reach IPv4-only services, routers can advertise the NAT64 prefix in RAs (PREF64), and DHCPv4 option 108 tells capable clients they may switch IPv4 off."
     ],
     "title": "Dual-stack rules for the real world"
    },
    {
     "type": "scenario",
     "situation": "After configuring `ipv6 address 2001:db8:acad:10::1/64` on R1's LAN interface, hosts only have fe80:: addresses. The interface is up/up and hosts can ping fe80::1.",
     "options": [
      {
       "text": "Change the prefix to /48 so it is larger",
       "feedback": "SLAAC requires a /64 on the LAN; /48 would break it.",
       "best": false
      },
      {
       "text": "Configure a DHCPv4 pool for the LAN",
       "feedback": "DHCPv4 only provides IPv4 settings.",
       "best": false
      },
      {
       "text": "Remove the link-local address",
       "feedback": "Link-local is required for NDP and is working — hosts can ping it.",
       "best": false
      },
      {
       "text": "Enable `ipv6 unicast-routing` globally so R1 forwards IPv6 and sends Router Advertisements",
       "feedback": "Correct. Without it the device acts like a host: no RAs, so clients have no prefix for SLAAC.",
       "best": true
      }
     ],
     "title": "No IPv6 addresses on the LAN"
    },
    {
     "type": "reflection",
     "prompt": "Your organisation still runs IPv4 only. Write three sentences for your manager explaining one business risk of staying IPv4-only and one practical first step toward dual stack."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "CIDR",
       "def": "Classless Inter-Domain Routing — explicit prefix lengths of any size instead of fixed classes."
      },
      {
       "term": "Prefix length",
       "def": "The number of leading network bits, written /n (e.g. /26, /64)."
      },
      {
       "term": "RFC 1918",
       "def": "The private IPv4 ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
      },
      {
       "term": "Block size",
       "def": "256 minus the mask value in the interesting octet; the gap between subnet network addresses."
      },
      {
       "term": "VLSM",
       "def": "Variable-length subnet masking — different prefix lengths inside one address block."
      },
      {
       "term": "Broadcast address",
       "def": "The address with all host bits set to 1; reaches every host on the IPv4 subnet."
      },
      {
       "term": "Link-local (IPv6)",
       "def": "fe80::/10 address valid on one link only; every IPv6 interface has one."
      },
      {
       "term": "Global unicast",
       "def": "Publicly routable IPv6 address, currently allocated from 2000::/3."
      },
      {
       "term": "Unique local",
       "def": "Private IPv6 range fc00::/7, used as fd00::/8."
      },
      {
       "term": "EUI-64",
       "def": "Method of building a 64-bit interface ID from a MAC by inserting FFFE and flipping the 7th bit."
      },
      {
       "term": "SLAAC",
       "def": "Stateless address autoconfiguration — hosts build IPv6 addresses from RA prefixes."
      },
      {
       "term": "Router Advertisement",
       "def": "ICMPv6 type 134 message announcing prefixes, flags and a default gateway."
      },
      {
       "term": "Dual stack",
       "def": "Running IPv4 and IPv6 at the same time on the same devices and links."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "NDP (ICMPv6 RS, RA, NS, NA) replaces ARP and drives IPv6 autoconfiguration.",
      "RA flags choose the method: A = SLAAC, O = stateless DHCPv6 for DNS, M = stateful DHCPv6 addressing.",
      "The default gateway always comes from the RA, usually as the router's link-local address.",
      "`ipv6 unicast-routing` makes a router forward IPv6 and send RAs.",
      "Dual stack is the common path; protect and monitor IPv6 exactly like IPv4."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the EUI-64 interface ID for MAC 00:50:56:AB:CD:EF?",
       "options": [
        "0050:56FF:FEAB:CDEF",
        "0250:56FF:FEAB:CDEF",
        "0250:56FE:FFAB:CDEF",
        "0050:56AB:FFFE:CDEF"
       ],
       "answer": 1,
       "explain": "Insert FFFE between 005056 and ABCDEF, then flip the 7th bit (00 → 02). The first option forgets the flip, the third reverses FFFE, and the fourth inserts FFFE in the wrong place."
      },
      {
       "q": "Which RA flag tells hosts to obtain their **address** from a DHCPv6 server?",
       "options": [
        "O (other configuration)",
        "A (autonomous) in the prefix option",
        "M (managed address configuration)",
        "L (on-link) in the prefix option"
       ],
       "answer": 2,
       "explain": "The M flag signals stateful DHCPv6 addressing. O signals DHCPv6 for other settings like DNS, A permits SLAAC, and L says the prefix is on-link."
      },
      {
       "q": "Where does an IPv6 host normally learn its default gateway?",
       "options": [
        "From a Router Advertisement",
        "From a stateful DHCPv6 lease",
        "From an ARP reply",
        "From the DNS server"
       ],
       "answer": 0,
       "explain": "IPv6 default gateways come from RAs, even when DHCPv6 is used. DHCPv6 does not carry a gateway option, ARP is IPv4 only, and DNS resolves names."
      },
      {
       "q": "Which NDP message does a host send to check that its new address is not already in use?",
       "options": [
        "Router Solicitation",
        "Neighbor Solicitation",
        "Router Advertisement",
        "Neighbor Advertisement"
       ],
       "answer": 1,
       "explain": "Duplicate address detection uses a Neighbor Solicitation for the tentative address. RS asks for routers, RA is sent by routers, and a Neighbor Advertisement is the reply to a solicitation."
      },
      {
       "q": "A dual-stack firewall has strict IPv4 rules but allows all IPv6. What is the risk?",
       "options": [
        "IPv4 traffic will automatically be dropped",
        "Hosts will stop receiving IPv6 addresses",
        "DNS will stop resolving IPv4 names",
        "Attackers can reach hosts over the open IPv6 path"
       ],
       "answer": 3,
       "explain": "Hosts prefer IPv6 and are reachable on it, so an unprotected IPv6 path bypasses the IPv4 policy. The other effects do not follow from an open IPv6 rule."
      },
      {
       "q": "Why should LAN subnets in IPv6 normally be /64?",
       "options": [
        "Routers cannot route any prefix longer than /64",
        "IPv6 hosts reject addresses with a /48 prefix",
        "SLAAC and most host features expect a 64-bit interface ID",
        "A /64 allows exactly 254 hosts per VLAN"
       ],
       "answer": 2,
       "explain": "SLAAC builds 64-bit interface IDs, so the LAN prefix must be /64. Routers can route longer prefixes (e.g. /127 links), hosts accept other prefixes manually, and a /64 holds far more than 254 hosts."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m3",
 "order": 3,
 "code": "Switch",
 "title": "Switching & VLANs",
 "subtitle": "MAC learning, VLANs, trunks, inter-VLAN routing, spanning tree, EtherChannel and LLDP",
 "outcomes": [
  "Explain how switches learn, forward, filter and flood frames and trace a host to its port",
  "Design VLANs and configure access ports and 802.1Q trunks safely",
  "Implement inter-VLAN routing with router-on-a-stick or layer 3 switch SVIs",
  "Control spanning tree root placement and protect edge ports with PortFast and BPDU guard",
  "Build and verify LACP EtherChannels and document neighbours with LLDP"
 ],
 "lessons": [
  {
   "id": "m3-l1",
   "title": "How Switches Learn and Forward Frames",
   "subtitle": "MAC learning, forwarding, filtering and flooding — and how to find any device",
   "minutes": 24,
   "objectives": [
    "Explain how a switch builds and uses its MAC address table",
    "Predict whether a frame will be forwarded, filtered or flooded",
    "Distinguish collision domains from broadcast domains",
    "Locate a host's switch port from its IP address"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A switch is a frame-forwarding machine. It knows nothing about IP subnets on its access ports; it only reads MAC addresses. Yet with one simple rule — **remember where each source address was seen** — it turns a pile of cables into an efficient LAN where traffic goes only where it needs to."
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Receive",
       "text": "A frame arrives on a port in a VLAN; the FCS is checked."
      },
      {
       "label": "Learn",
       "text": "The source MAC + port + VLAN is added to (or refreshed in) the MAC table."
      },
      {
       "label": "Look up",
       "text": "The destination MAC is searched in that VLAN's table."
      },
      {
       "label": "Decide",
       "text": "Forward to one port, filter (drop), or flood to all ports in the VLAN except the source."
      },
      {
       "label": "Age out",
       "text": "Entries not refreshed are removed — typically after 300 seconds."
      }
     ],
     "title": "What a switch does with every frame"
    },
    {
     "type": "table",
     "head": [
      "Destination MAC is…",
      "Switch action",
      "Why"
     ],
     "rows": [
      [
       "Known, on a different port",
       "Forward out that one port",
       "Normal unicast switching"
      ],
      [
       "Known, on the same port it arrived on",
       "Filter (drop)",
       "The receiver is already on that segment"
      ],
      [
       "Unknown unicast",
       "Flood to all ports in the VLAN except the source",
       "The switch must find the receiver"
      ],
      [
       "Broadcast (FF:FF:FF:FF:FF:FF)",
       "Flood within the VLAN",
       "Broadcasts are meant for everyone in the VLAN"
      ],
      [
       "Multicast",
       "Flood within the VLAN unless multicast snooping limits it",
       "Snooping learns which ports joined the group"
      ]
     ],
     "title": "Forwarding decisions"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "The **MAC address table** (often called the CAM table because of the fast memory it uses) maps **VLAN + MAC address → port**. Dynamic entries are learned from source addresses; static entries are configured by an engineer.",
     "title": "MAC address table"
    },
    {
     "type": "cli",
     "device": "Switch SW1 · IOS-style CLI",
     "lines": [
      "SW1# show mac address-table dynamic",
      "          Mac Address Table",
      "-------------------------------------------",
      "Vlan    Mac Address       Type        Ports",
      "----    -----------       --------    -----",
      "  10    0050.56a1.1b2c    DYNAMIC     Gi1/0/1",
      "  10    0050.56a1.77e0    DYNAMIC     Gi1/0/2",
      "  20    6c4b.90de.0012    DYNAMIC     Gi1/0/14",
      "  10    0011.2233.4401    DYNAMIC     Gi1/0/48",
      "  20    0011.2233.4401    DYNAMIC     Gi1/0/48",
      "Total Mac Addresses for this criterion: 5"
     ],
     "title": "Reading the MAC address table",
     "note": "The same router MAC appears in VLAN 10 and VLAN 20 on Gi1/0/48 — the uplink trunk. Many MACs on one port usually means that port leads to another switch, AP or router."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Hub (legacy)",
       "items": [
        "Layer 1 repeater",
        "Every bit goes out every port",
        "One collision domain for all ports",
        "Half duplex only — not used today"
       ]
      },
      {
       "title": "Switch",
       "items": [
        "Layer 2 (some also route at Layer 3)",
        "Forwards by MAC address",
        "Each port is its own collision domain",
        "A VLAN is one broadcast domain"
       ]
      },
      {
       "title": "Router",
       "items": [
        "Layer 3",
        "Forwards by IP address and routing table",
        "Each interface is its own broadcast domain",
        "Does not forward broadcasts between networks"
       ]
      }
     ],
     "title": "Hub vs switch vs router"
    },
    {
     "type": "keypoints",
     "items": [
      "A **collision domain** is where two frames can collide; full-duplex switch ports eliminate collisions in practice.",
      "A **broadcast domain** is everywhere a broadcast reaches — one VLAN.",
      "Switches separate collision domains; **routers and VLANs** separate broadcast domains.",
      "Huge broadcast domains (thousands of hosts in one VLAN) waste bandwidth and CPU on every host."
     ],
     "title": "Collision vs broadcast domains"
    },
    {
     "type": "sequence",
     "title": "Walk-through: PC-A talks to PC-B for the first time (VLAN 10)",
     "actors": [
      "PC-A (Gi1/0/1)",
      "Switch SW1",
      "PC-B (Gi1/0/2)"
     ],
     "steps": [
      {
       "from": 0,
       "to": 1,
       "label": "ARP request (broadcast)",
       "note": "dst FF:FF:FF:FF:FF:FF"
      },
      {
       "from": 1,
       "to": 1,
       "label": "Learn PC-A's MAC on Gi1/0/1"
      },
      {
       "from": 1,
       "to": 2,
       "label": "Flood to VLAN 10 ports"
      },
      {
       "from": 2,
       "to": 1,
       "label": "ARP reply (unicast)",
       "reply": true
      },
      {
       "from": 1,
       "to": 1,
       "label": "Learn PC-B's MAC on Gi1/0/2"
      },
      {
       "from": 1,
       "to": 0,
       "label": "Forward out Gi1/0/1 only",
       "reply": true
      },
      {
       "from": 0,
       "to": 1,
       "label": "Data frame to PC-B's MAC"
      },
      {
       "from": 1,
       "to": 2,
       "label": "Forward out Gi1/0/2 only",
       "note": "no flooding needed now"
      }
     ],
     "caption": "The ARP request is a broadcast, so it is flooded; from the reply onward the switch knows both ports and every frame between A and B goes to one port only."
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Most enterprise switches **store and forward**: they receive the whole frame and check the FCS before sending it on, so corrupted frames die at the first switch. Some data-centre switches use **cut-through** to start forwarding as soon as the destination MAC is read, saving microseconds but passing on bad frames.",
     "title": "Store-and-forward vs cut-through"
    },
    {
     "type": "cli",
     "device": "R1 and SW1 · IOS-style CLI",
     "lines": [
      "R1# show ip arp 10.10.20.57",
      "Protocol  Address          Age (min)  Hardware Addr   Type   Interface",
      "Internet  10.10.20.57             3   6c4b.90de.0012  ARPA   GigabitEthernet0/0.20",
      "SW1# show mac address-table address 6c4b.90de.0012",
      "Vlan    Mac Address       Type        Ports",
      "----    -----------       --------    -----",
      "  20    6c4b.90de.0012    DYNAMIC     Gi1/0/14"
     ],
     "title": "Finding which port a host is on",
     "note": "IP → MAC from the gateway's ARP table, then MAC → port from the switch. If the port is an uplink, repeat on the next switch until you reach an access port."
    },
    {
     "type": "scenario",
     "situation": "Security asks you to find the wall port used by IP 10.10.20.57. You have CLI access to the gateway router and every switch.",
     "options": [
      {
       "text": "Read the gateway's ARP entry for the IP, then search for that MAC in the switch MAC tables until you reach an access port",
       "feedback": "Correct. ARP maps IP to MAC; MAC tables map MAC to port. Following uplinks leads you to the exact port.",
       "best": true
      },
      {
       "text": "Ping the IP and wait for someone to complain",
       "feedback": "That gives no location information.",
       "best": false
      },
      {
       "text": "Shut down every port in VLAN 20 one by one",
       "feedback": "That disrupts many users and is slow and risky.",
       "best": false
      },
      {
       "text": "Check the DNS server for the device name",
       "feedback": "A name rarely tells you the physical port, and rogue devices are often not in DNS.",
       "best": false
      }
     ],
     "title": "A suspicious device"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "A switch learns source MACs per VLAN and port, then forwards, filters or floods on the destination MAC.",
      "Unknown unicast, broadcast and (without snooping) multicast are flooded within the VLAN only.",
      "Each switch port is a collision domain; each VLAN is a broadcast domain.",
      "To find a host: IP → MAC from the gateway's ARP table, then MAC → port through the switch MAC tables."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A switch receives a frame whose destination MAC is not in its table. What does it do?",
       "options": [
        "Floods it out all ports in that VLAN except the source",
        "Drops it and sends an error to the source host",
        "Sends it only to the uplink port toward the core",
        "Floods it out every port in every VLAN on the switch"
       ],
       "answer": 0,
       "explain": "Unknown unicast frames are flooded within the VLAN. Switches do not return errors, have no default uplink for unknown MACs, and never flood across VLANs."
      },
      {
       "q": "Which part of an incoming frame does a switch use to **populate** its MAC table?",
       "options": [
        "Destination MAC address",
        "Source IP address",
        "Source MAC address",
        "VLAN priority bits"
       ],
       "answer": 2,
       "explain": "Learning uses the source MAC and arrival port. Forwarding uses the destination MAC; IP addresses and priority bits are not used for learning."
      },
      {
       "q": "How many broadcast domains exist on one switch with VLANs 10, 20 and 30 in use?",
       "options": [
        "One",
        "Three",
        "As many as there are ports",
        "Two"
       ],
       "answer": 1,
       "explain": "Each VLAN is its own broadcast domain. One would mean no VLANs, ports correspond to collision domains, and two does not match the three VLANs."
      },
      {
       "q": "Twenty MAC addresses are learned on port Gi1/0/48. What is the most likely explanation?",
       "options": [
        "The port connects to another switch or AP",
        "The port has a duplex mismatch",
        "The MAC table has overflowed",
        "Twenty users are sharing one patch cable through a splitter"
       ],
       "answer": 0,
       "explain": "Many MACs on one port is normal on uplinks and AP ports. Duplex problems do not create MAC entries, overflow would affect all ports, and one cable serves one device."
      },
      {
       "q": "Which device separates broadcast domains?",
       "options": [
        "A hub",
        "A layer 2 switch without VLANs",
        "A repeater",
        "A router"
       ],
       "answer": 3,
       "explain": "Routers do not forward broadcasts between networks. Hubs and repeaters forward everything, and a switch without VLANs is one broadcast domain."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l2",
   "title": "VLANs, Access Ports and 802.1Q Trunks",
   "subtitle": "Segmenting the LAN and carrying many VLANs over one link",
   "minutes": 30,
   "objectives": [
    "Explain why VLANs are used and what a VLAN changes in the network",
    "Configure access ports and 802.1Q trunks with a safe native VLAN",
    "Verify VLAN membership and trunk status and fix allowed-VLAN errors"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A **VLAN (virtual LAN)** splits one physical switch network into several logical networks. Devices in different VLANs cannot talk at Layer 2 even when they share a switch; to communicate they must go through a router or layer 3 switch, where policy can be applied. In practice, **one VLAN = one IP subnet = one broadcast domain**."
    },
    {
     "type": "keypoints",
     "items": [
      "**Security** — guests, cameras and finance PCs are separated and filtered at the gateway.",
      "**Smaller broadcast domains** — less noise per host.",
      "**Flexibility** — a user moves desks; only the port's VLAN changes, not the cabling.",
      "**Quality of service** — voice gets its own VLAN that is easy to prioritise.",
      "**Clean addressing** — the VLAN plan and the IP plan line up one to one."
     ],
     "title": "Why every enterprise uses VLANs"
    },
    {
     "type": "table",
     "head": [
      "Field",
      "Bits",
      "Meaning"
     ],
     "rows": [
      [
       "TPID",
       "16",
       "0x8100 — marks the frame as tagged"
      ],
      [
       "PCP (priority)",
       "3",
       "Class of service 0–7 for QoS"
      ],
      [
       "DEI",
       "1",
       "Drop eligible indicator"
      ],
      [
       "VID",
       "12",
       "VLAN ID: 1–4094 usable (0 and 4095 reserved)"
      ]
     ],
     "title": "The 802.1Q tag (4 bytes inserted after the source MAC)"
    },
    {
     "type": "packet",
     "title": "Where the 802.1Q tag sits in the frame",
     "fields": [
      {
       "label": "Destination MAC",
       "bits": 48
      },
      {
       "label": "Source MAC",
       "bits": 48
      },
      {
       "label": "TPID 0x8100",
       "bits": 16
      },
      {
       "label": "PCP",
       "bits": 3
      },
      {
       "label": "DEI",
       "bits": 1
      },
      {
       "label": "VLAN ID (VID)",
       "bits": 12
      },
      {
       "label": "EtherType",
       "bits": 16
      },
      {
       "label": "Payload",
       "bits": 16,
       "variable": true
      },
      {
       "label": "FCS",
       "bits": 32
      }
     ],
     "caption": "The 4-byte tag is inserted between the source MAC and the original EtherType. The 3-bit PCP carries the CoS value used by QoS; the 12-bit VID carries the VLAN. The payload is drawn short."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Access port",
       "items": [
        "Belongs to one data VLAN",
        "Frames sent and received untagged",
        "Connects end devices: PCs, printers, cameras",
        "Can add a separate voice VLAN for an IP phone"
       ]
      },
      {
       "title": "Trunk port",
       "items": [
        "Carries many VLANs over one link",
        "Frames tagged with 802.1Q (except the native VLAN)",
        "Connects switch-switch, switch-router, switch-AP, switch-server host",
        "Should list allowed VLANs explicitly"
       ]
      }
     ],
     "title": "Access port vs trunk port"
    },
    {
     "type": "cli",
     "device": "Switch SW1 · IOS-style CLI",
     "lines": [
      "SW1(config)# vlan 10",
      "SW1(config-vlan)# name STAFF",
      "SW1(config-vlan)# vlan 20",
      "SW1(config-vlan)# name STUDENTS",
      "SW1(config-vlan)# vlan 50",
      "SW1(config-vlan)# name VOICE",
      "SW1(config-vlan)# vlan 99",
      "SW1(config-vlan)# name NATIVE-UNUSED",
      "SW1(config-vlan)# exit",
      "SW1(config)# interface range GigabitEthernet1/0/1 - 12",
      "SW1(config-if-range)# switchport mode access",
      "SW1(config-if-range)# switchport access vlan 10",
      "SW1(config-if-range)# switchport voice vlan 50",
      "SW1(config-if-range)# spanning-tree portfast"
     ],
     "title": "Creating VLANs and access ports",
     "note": "Hard-coding `switchport mode access` stops the port from ever becoming a trunk. The voice VLAN lets an IP phone tag its own traffic while the PC behind it stays untagged in VLAN 10."
    },
    {
     "type": "cli",
     "device": "Switch SW1 · IOS-style CLI",
     "lines": [
      "SW1(config)# interface GigabitEthernet1/0/24",
      "SW1(config-if)# switchport mode trunk",
      "SW1(config-if)# switchport trunk native vlan 99",
      "SW1(config-if)# switchport trunk allowed vlan 10,20,50,99",
      "SW1(config-if)# switchport nonegotiate"
     ],
     "title": "Configuring an 802.1Q trunk",
     "note": "Some multi-protocol switches also need `switchport trunk encapsulation dot1q` before `switchport mode trunk`. `switchport nonegotiate` turns off automatic trunk negotiation messages."
    },
    {
     "type": "topology",
     "title": "VLANs across two switches",
     "nodes": [
      {
       "id": "sw1",
       "kind": "switch",
       "label": "SW1",
       "sub": "Native 99",
       "x": 2,
       "y": 2
      },
      {
       "id": "sw2",
       "kind": "switch",
       "label": "SW2",
       "sub": "Native 99",
       "x": 5,
       "y": 2
      },
      {
       "id": "pc1",
       "kind": "host",
       "label": "Staff PC",
       "sub": "VLAN 10",
       "x": 1,
       "y": 4
      },
      {
       "id": "ph",
       "kind": "phone",
       "label": "IP phone",
       "sub": "Voice VLAN 50",
       "x": 3,
       "y": 4
      },
      {
       "id": "pc2",
       "kind": "host",
       "label": "Student PC",
       "sub": "VLAN 20",
       "x": 4,
       "y": 4
      },
      {
       "id": "pc3",
       "kind": "host",
       "label": "Accounts PC",
       "sub": "VLAN 30 · not on trunk",
       "x": 6,
       "y": 4
      }
     ],
     "links": [
      {
       "a": "sw1",
       "b": "sw2",
       "label": "802.1Q trunk 10,20,50,99",
       "style": "bold"
      },
      {
       "a": "pc1",
       "b": "sw1",
       "label": "access"
      },
      {
       "a": "ph",
       "b": "sw1",
       "label": "access + voice"
      },
      {
       "a": "pc2",
       "b": "sw2",
       "label": "access"
      },
      {
       "a": "pc3",
       "b": "sw2",
       "label": "access"
      }
     ],
     "caption": "One trunk carries tagged frames for every allowed VLAN, while access ports send and receive untagged frames in a single VLAN. The Accounts PC on SW2 is stranded until VLAN 30 is added to the trunk — the scenario below."
    },
    {
     "type": "cli",
     "device": "Switch SW1 · IOS-style CLI",
     "lines": [
      "SW1# show vlan brief",
      "VLAN Name                             Status    Ports",
      "---- -------------------------------- --------- ------------------------------",
      "1    default                          active    Gi1/0/13, Gi1/0/14, Gi1/0/15",
      "10   STAFF                            active    Gi1/0/1, Gi1/0/2, Gi1/0/3",
      "20   STUDENTS                         active    Gi1/0/16, Gi1/0/17",
      "99   NATIVE-UNUSED                    active",
      "SW1# show interfaces trunk",
      "Port        Mode         Encapsulation  Status        Native vlan",
      "Gi1/0/24    on           802.1q         trunking      99",
      "Port        Vlans allowed on trunk",
      "Gi1/0/24    10,20,50,99"
     ],
     "title": "Verifying VLANs and trunks",
     "note": "Trunk ports do not appear in `show vlan brief` — check them with `show interfaces trunk`. Ports still in VLAN 1 are a sign of unconfigured ports."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Frames in the **native VLAN** cross a trunk untagged. If the two ends disagree on the native VLAN, untagged traffic silently lands in the wrong VLAN on the other side. Use the **same, unused** native VLAN at both ends (e.g. 99), never put users in it, and never leave VLAN 1 as the native VLAN carrying user traffic.",
     "title": "Native VLAN pitfalls"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Put unused ports in an unused \"parking\" VLAN and shut them down; set every user port to `switchport mode access`; disable trunk negotiation; restrict allowed VLANs on trunks. These four habits close the most common layer 2 attacks (covered fully in the Guard module).",
     "title": "Harden every switch on day one"
    },
    {
     "type": "scenario",
     "situation": "VLAN 30 (Accounts) works on SW1 but PCs in VLAN 30 on SW2 cannot reach their gateway on SW1. `show interfaces trunk` on SW1 shows allowed VLANs `10,20,50,99` on the link to SW2. VLAN 30 exists on both switches.",
     "options": [
      {
       "text": "Run `switchport trunk allowed vlan 30` on the trunk",
       "feedback": "Without the `add` keyword this **replaces** the list with only VLAN 30 and cuts off every other VLAN on the link.",
       "best": false
      },
      {
       "text": "Run `switchport trunk allowed vlan add 30` on both ends of the trunk",
       "feedback": "Correct. `add` appends VLAN 30 while keeping 10, 20, 50 and 99.",
       "best": true
      },
      {
       "text": "Change the native VLAN to 30",
       "feedback": "That would carry VLAN 30 untagged and break the native VLAN design.",
       "best": false
      },
      {
       "text": "Set the SW2 ports to `switchport mode trunk`",
       "feedback": "PCs need access ports; the trunk between switches is the problem.",
       "best": false
      }
     ],
     "title": "A new VLAN does not work on the second floor"
    },
    {
     "type": "template",
     "title": "VLAN plan",
     "purpose": "One row per VLAN, agreed before any switch is configured. Pair it with the IP addressing plan.",
     "columns": [
      "VLAN ID",
      "Name",
      "Purpose / users",
      "IPv4 subnet",
      "IPv6 /64",
      "Gateway (SVI)",
      "Allowed on trunks to"
     ],
     "example": [
      [
       "20",
       "STUDENTS",
       "Lab PCs and student Wi-Fi",
       "10.10.20.0/23",
       "2001:db8:acad:20::/64",
       "DS1 Vlan20 10.10.20.1",
       "All access switches, WLC"
      ]
     ],
     "rows": 8
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "One VLAN = one subnet = one broadcast domain; traffic between VLANs must be routed.",
      "Access ports carry one untagged data VLAN (plus an optional voice VLAN); trunks carry many VLANs with 4-byte 802.1Q tags.",
      "Use the same unused native VLAN at both ends and never put users in it.",
      "Use `switchport trunk allowed vlan add` — without `add` you replace the whole list.",
      "Verify trunks with `show interfaces trunk`; they do not appear in `show vlan brief`."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "How many bits does the 802.1Q tag use for the VLAN ID?",
       "options": [
        "8",
        "16",
        "3",
        "12"
       ],
       "answer": 3,
       "explain": "The VID is 12 bits, giving IDs 1–4094. 16 bits is the TPID, 3 bits is the priority field, and 8 bits would allow only 256 values."
      },
      {
       "q": "Which frames cross an 802.1Q trunk **untagged**?",
       "options": [
        "Frames in VLAN 4095",
        "Frames in the native VLAN",
        "All broadcast frames",
        "Frames sent by IP phones in the voice VLAN"
       ],
       "answer": 1,
       "explain": "Only native-VLAN frames are sent untagged. VLAN 4095 is reserved, broadcasts are tagged with their VLAN, and phone traffic is tagged in the voice VLAN."
      },
      {
       "q": "A trunk allows VLANs 10,20. An engineer types `switchport trunk allowed vlan 40`. What is the result?",
       "options": [
        "Only VLAN 40 is now allowed",
        "VLANs 10, 20 and 40 are allowed",
        "The command is rejected as a duplicate",
        "All VLANs become allowed"
       ],
       "answer": 0,
       "explain": "Without `add`, the command replaces the list. `switchport trunk allowed vlan add 40` would keep 10 and 20."
      },
      {
       "q": "Two switches have native VLAN 1 on one end and 99 on the other. What is the main risk?",
       "options": [
        "The trunk speed drops to 100 Mbps",
        "All tagged VLANs stop forwarding",
        "Untagged traffic leaks into the wrong VLAN",
        "The switches reboot repeatedly"
       ],
       "answer": 2,
       "explain": "A native mismatch merges two VLANs for untagged frames. It does not change speed, block tagged VLANs or reboot devices (switches usually log a warning)."
      },
      {
       "q": "Which command shows the VLANs actually allowed on a trunk?",
       "options": [
        "`show vlan brief`",
        "`show interfaces trunk`",
        "`show mac address-table`",
        "`show ip interface brief`"
       ],
       "answer": 1,
       "explain": "`show interfaces trunk` lists mode, native VLAN and allowed VLANs. `show vlan brief` omits trunk ports, the MAC table shows learned addresses, and `show ip interface brief` lists layer 3 interfaces."
      },
      {
       "q": "Where should a desk IP phone with a PC plugged into it connect?",
       "options": [
        "A trunk port allowing every VLAN configured on the switch",
        "An access port in the native VLAN",
        "A routed port with an IP address",
        "An access port with a data VLAN and a voice VLAN"
       ],
       "answer": 3,
       "explain": "Access ports with a voice VLAN carry the phone's tagged voice and the PC's untagged data. A full trunk to a desk is a security risk, the native VLAN should hold no users, and a routed port does not switch."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l3",
   "title": "Inter-VLAN Routing: Router-on-a-Stick and SVIs",
   "subtitle": "Letting VLANs talk — through a gateway where policy can be applied",
   "minutes": 28,
   "objectives": [
    "Compare router-on-a-stick, SVIs on a layer 3 switch and separate routed interfaces",
    "Configure router-on-a-stick subinterfaces and layer 3 switch SVIs",
    "Troubleshoot an SVI that is up/down"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "VLANs keep traffic apart; **inter-VLAN routing** brings it back together in a controlled way. Every VLAN needs a default gateway — an IP interface that belongs to that VLAN's subnet. Where that gateway lives decides how fast inter-VLAN traffic flows and where you enforce policy."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Separate router interfaces",
       "items": [
        "One physical router port per VLAN",
        "Simple to understand",
        "Runs out of ports quickly",
        "Rare except in very small labs"
       ]
      },
      {
       "title": "Router-on-a-stick",
       "items": [
        "One trunk to the router, one subinterface per VLAN",
        "Cheap; fine for a small branch",
        "All inter-VLAN traffic crosses one link twice",
        "Throughput limited by that link and the router"
       ]
      },
      {
       "title": "Layer 3 switch with SVIs",
       "items": [
        "One virtual interface (SVI) per VLAN inside the switch",
        "Routing in hardware at line rate",
        "Standard for campus distribution/core",
        "Uplinks to router or firewall use routed ports"
       ]
      }
     ],
     "title": "Three ways to route between VLANs"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "PC-A",
       "text": "10.10.10.25 sends to 10.10.20.40; it is off-subnet, so the frame goes to the gateway MAC."
      },
      {
       "label": "Trunk up",
       "text": "The switch tags the frame VLAN 10 and sends it up the trunk."
      },
      {
       "label": "Router",
       "text": "Subinterface .10 receives it; the routing table points to connected subnet 10.10.20.0/24 on .20."
      },
      {
       "label": "Trunk down",
       "text": "The router sends a new frame tagged VLAN 20 back down the same trunk."
      },
      {
       "label": "PC-B",
       "text": "The switch removes the tag and delivers the frame on PC-B's access port."
      }
     ],
     "title": "A packet from VLAN 10 to VLAN 20 via router-on-a-stick"
    },
    {
     "type": "topology",
     "title": "Router-on-a-stick",
     "nodes": [
      {
       "id": "r1",
       "kind": "router",
       "label": "R1",
       "sub": "Gi0/0.10 · Gi0/0.20",
       "x": 3,
       "y": 0
      },
      {
       "id": "sw",
       "kind": "switch",
       "label": "SW1",
       "x": 3,
       "y": 2
      },
      {
       "id": "a",
       "kind": "host",
       "label": "PC-A",
       "sub": "10.10.10.25 · VLAN 10",
       "x": 1,
       "y": 4
      },
      {
       "id": "b",
       "kind": "host",
       "label": "PC-B",
       "sub": "10.10.20.40 · VLAN 20",
       "x": 5,
       "y": 4
      }
     ],
     "links": [
      {
       "a": "r1",
       "b": "sw",
       "label": "Trunk 10, 20, 99",
       "style": "bold",
       "bEnd": "Gi1/0/48"
      },
      {
       "a": "a",
       "b": "sw",
       "label": "access VLAN 10"
      },
      {
       "a": "b",
       "b": "sw",
       "label": "access VLAN 20"
      }
     ],
     "caption": "One trunk carries both VLANs to R1. A packet from PC-A crosses the trunk twice: up tagged VLAN 10 to subinterface .10, and back down tagged VLAN 20 from subinterface .20."
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# interface GigabitEthernet0/0",
      "R1(config-if)# no shutdown",
      "R1(config-if)# interface GigabitEthernet0/0.10",
      "R1(config-subif)# description STAFF",
      "R1(config-subif)# encapsulation dot1Q 10",
      "R1(config-subif)# ip address 10.10.10.1 255.255.255.0",
      "R1(config-subif)# interface GigabitEthernet0/0.20",
      "R1(config-subif)# description STUDENTS",
      "R1(config-subif)# encapsulation dot1Q 20",
      "R1(config-subif)# ip address 10.10.20.1 255.255.255.0",
      "R1(config-subif)# interface GigabitEthernet0/0.99",
      "R1(config-subif)# encapsulation dot1Q 99 native"
     ],
     "title": "Router-on-a-stick",
     "note": "The subinterface number is only a label — the `encapsulation dot1Q` VLAN ID is what matters. Matching them (Gi0/0.10 ↔ VLAN 10) keeps life simple. The switch port facing the router must be a trunk carrying 10, 20 and 99."
    },
    {
     "type": "topology",
     "title": "Inter-VLAN routing on a layer 3 switch",
     "nodes": [
      {
       "id": "fw",
       "kind": "firewall",
       "label": "Edge firewall",
       "sub": "10.0.0.2/30",
       "x": 3,
       "y": 0
      },
      {
       "id": "ds1",
       "kind": "l3switch",
       "label": "DS1",
       "sub": "SVIs Vlan10/20/30 .1",
       "x": 3,
       "y": 2
      },
      {
       "id": "as1",
       "kind": "switch",
       "label": "AS1",
       "sub": "Staff, students",
       "x": 1,
       "y": 4
      },
      {
       "id": "as2",
       "kind": "switch",
       "label": "AS2",
       "sub": "Accounts",
       "x": 5,
       "y": 4
      }
     ],
     "links": [
      {
       "a": "ds1",
       "b": "fw",
       "label": "routed 10.0.0.0/30",
       "aEnd": "Gi1/0/48"
      },
      {
       "a": "ds1",
       "b": "as1",
       "label": "trunk 10,20"
      },
      {
       "a": "ds1",
       "b": "as2",
       "label": "trunk 10,20,30"
      }
     ],
     "caption": "Traffic between VLANs turns around inside DS1 in hardware; only traffic leaving the campus uses the routed uplink Gi1/0/48 toward the edge firewall."
    },
    {
     "type": "cli",
     "device": "Switch DS1 · IOS-style CLI",
     "lines": [
      "DS1(config)# ip routing",
      "DS1(config)# vlan 10,20,30",
      "DS1(config-vlan)# exit",
      "DS1(config)# interface vlan 10",
      "DS1(config-if)# ip address 10.10.10.1 255.255.255.0",
      "DS1(config-if)# no shutdown",
      "DS1(config-if)# interface vlan 20",
      "DS1(config-if)# ip address 10.10.20.1 255.255.255.0",
      "DS1(config-if)# no shutdown",
      "DS1(config-if)# interface GigabitEthernet1/0/48",
      "DS1(config-if)# no switchport",
      "DS1(config-if)# ip address 10.0.0.1 255.255.255.252"
     ],
     "title": "SVIs on a layer 3 switch",
     "note": "`ip routing` turns on IPv4 routing between SVIs. `no switchport` converts Gi1/0/48 into a routed port for the uplink to the edge router or firewall."
    },
    {
     "type": "keypoints",
     "items": [
      "The VLAN **exists** in the switch's VLAN database.",
      "At least one port in that VLAN is **up and forwarding** (an access port, or a trunk that carries the VLAN).",
      "The SVI is **not administratively shut down** (`no shutdown`).",
      "On many platforms, `ip routing` must be enabled for SVIs to route between each other."
     ],
     "title": "An SVI comes up/up only when…"
    },
    {
     "type": "cli",
     "device": "Switch DS1 · IOS-style CLI",
     "lines": [
      "DS1# show ip interface brief | include Vlan",
      "Vlan10                 10.10.10.1      YES manual up                    up",
      "Vlan20                 10.10.20.1      YES manual up                    up",
      "Vlan30                 10.10.30.1      YES manual up                    down",
      "DS1# show vlan id 30",
      "VLAN Name                             Status    Ports",
      "---- -------------------------------- --------- ------------------------------",
      "30   VLAN0030                         active"
     ],
     "title": "Spotting a down SVI",
     "note": "VLAN 30 exists but has no ports, and no trunk carries it yet — so the SVI is up/down."
    },
    {
     "type": "scenario",
     "situation": "On DS1, `Vlan30` shows **up/down**. VLAN 30 exists. The accounts PCs are on access switch AS3, whose ports are in VLAN 30, and AS3 connects to DS1 through trunk Gi1/0/3 that allows VLANs 10,20,99.",
     "options": [
      {
       "text": "Run `shutdown` then `no shutdown` on interface Vlan30",
       "feedback": "The SVI is not admin-down; bouncing it will not create an active port in VLAN 30.",
       "best": false
      },
      {
       "text": "Change the SVI's IP address to 10.10.30.254",
       "feedback": "The address is not the cause of a protocol-down state.",
       "best": false
      },
      {
       "text": "Enable `ip routing` again",
       "feedback": "Routing is already on — Vlan10 and Vlan20 work.",
       "best": false
      },
      {
       "text": "Add VLAN 30 to the allowed list on the DS1–AS3 trunk (both ends)",
       "feedback": "Correct. Once the trunk carries VLAN 30 and forwards, DS1 has an active port in the VLAN and the SVI comes up/up.",
       "best": true
      }
     ],
     "title": "Accounts cannot reach their gateway"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "When migrating from router-on-a-stick to SVIs, never leave both the router subinterface and the new SVI configured with the same gateway IP — you create a duplicate address that breaks the VLAN intermittently. Remove one, then enable the other, in a planned window.",
     "title": "Same subnet, two gateways"
    },
    {
     "type": "case",
     "title": "A university computer-lab network",
     "context": "A private university in Dhaka's Bashundhara area has two student computer labs (90 PCs each), a staff room (30 PCs), lab printers and a file server. Everything is in one flat VLAN 1 on one large layer 3-capable switch plus three access switches. Students have been browsing staff shares, and last week a student plugged a small home switch into two wall ports, taking the whole lab down for an hour.",
     "questions": [
      "Propose a VLAN design for this site.",
      "Where should inter-VLAN routing happen and why?",
      "Which switch features stop the \"home switch in two wall ports\" outage from repeating?"
     ],
     "answer": "Create VLANs per role: **Lab A** and **Lab B** (or one student VLAN of /24 with room to grow), **Staff**, **Printers**, **Servers** and a **Management** VLAN, plus an unused native VLAN for trunks. Route between them with **SVIs on the layer 3 switch** — wire-speed routing in hardware — and apply ACLs so student VLANs can reach printers and the internet but not staff shares (ACL details come in the Guard module). Make the access-switch uplinks 802.1Q trunks with explicit allowed lists. To stop the loop, run **RSTP**, set the core switch as **root bridge**, and enable **PortFast with BPDU guard** on every student-facing port so a port that hears a BPDU from a rogue switch shuts down instead of looping the network."
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Every VLAN needs a gateway inside its own subnet; where it lives decides speed and policy.",
      "Router-on-a-stick: one trunk, one subinterface per VLAN; the `encapsulation dot1Q` ID selects the VLAN.",
      "Layer 3 switch SVIs route in hardware and are the campus standard; `ip routing` must be on.",
      "An SVI is up/up only when its VLAN exists and has at least one forwarding port."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "On a router-on-a-stick, what decides which VLAN a subinterface serves?",
       "options": [
        "The subinterface number",
        "The interface description",
        "The `encapsulation dot1Q` VLAN ID",
        "The IP address's third octet"
       ],
       "answer": 2,
       "explain": "The dot1Q encapsulation sets the VLAN. Subinterface numbers and descriptions are labels, and the IP address does not select a VLAN."
      },
      {
       "q": "An SVI shows up/down. What is the most likely cause?",
       "options": [
        "No active port is forwarding in that VLAN",
        "The SVI has been administratively shut down by an engineer",
        "`ip routing` has been enabled",
        "The SVI address is a private address"
       ],
       "answer": 0,
       "explain": "Protocol down means the VLAN has no active, forwarding port. An admin-shut SVI would show administratively down, `ip routing` does not bring SVIs down, and private addresses are normal."
      },
      {
       "q": "Why are layer 3 switch SVIs preferred over router-on-a-stick in a campus?",
       "options": [
        "SVIs do not need IP addresses",
        "SVIs remove the need to create any VLANs on the switch",
        "Hardware routing with no single-trunk bottleneck",
        "SVIs work only with IPv6 traffic"
       ],
       "answer": 2,
       "explain": "SVIs route at line rate inside the switch. They do need IP addresses, they depend on VLANs, and they support IPv4 and IPv6."
      },
      {
       "q": "Which command turns a layer 3 switch port into a routed port?",
       "options": [
        "`no switchport`",
        "`switchport mode access`",
        "`ip routing`",
        "`switchport trunk native vlan 1`"
       ],
       "answer": 0,
       "explain": "`no switchport` makes the port a layer 3 interface. Access mode keeps it a layer 2 port, `ip routing` enables routing globally, and the native VLAN command applies to trunks."
      },
      {
       "q": "PCs in VLAN 10 can reach each other but not VLAN 20. The router-on-a-stick config looks correct. What should you check next?",
       "options": [
        "The PCs' network card drivers are the latest available version",
        "The router's hostname matches the switch's",
        "The MAC table aging timer is 300 seconds",
        "The router-facing switch port trunks both VLANs"
       ],
       "answer": 3,
       "explain": "If the switch-to-router link is an access port or lacks VLAN 20, frames never reach the subinterface. Drivers, hostnames and aging timers do not cause this symptom."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l4",
   "title": "Spanning Tree: Loop Prevention with STP and RSTP",
   "subtitle": "Root bridge election, port roles and states, PortFast and BPDU guard",
   "minutes": 32,
   "objectives": [
    "Explain why layer 2 loops are destructive",
    "Predict the root bridge, root ports, designated ports and blocked ports",
    "Compare 802.1D STP with Rapid STP (802.1w)",
    "Configure root priority, PortFast and BPDU guard and verify the result"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Redundant links between switches are essential — but Ethernet frames have **no TTL**. A broadcast that enters a loop circles forever, multiplying at every switch until links and CPUs are saturated. **Spanning Tree Protocol (STP)** prevents this by logically blocking just enough ports to leave one loop-free path, and unblocking them automatically if the active path fails."
    },
    {
     "type": "keypoints",
     "items": [
      "**Broadcast storm** — link utilisation jumps to 100%, every host slows down.",
      "**MAC flapping** — the same MAC address is learned on different ports again and again.",
      "**Duplicate frames** — applications receive the same data twice.",
      "Switches become slow to answer on the CLI; port LEDs blink in unison."
     ],
     "title": "Symptoms of a layer 2 loop"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Elect the root bridge",
       "text": "Switches exchange BPDUs. The lowest **bridge ID** (priority, then MAC address) wins. Default priority is 32768, so the oldest/lowest MAC often wins by accident."
      },
      {
       "title": "Choose a root port on every other switch",
       "text": "The port with the lowest total **path cost** to the root. Ties: lowest sender bridge ID, then lowest sender port ID."
      },
      {
       "title": "Choose a designated port on every segment",
       "text": "The port on each link with the lowest cost back to the root forwards for that link. All root bridge ports are designated."
      },
      {
       "title": "Block the rest",
       "text": "Every remaining port is non-designated (alternate in RSTP) and discards data frames, breaking the loop."
      }
     ],
     "title": "How STP builds the tree"
    },
    {
     "type": "table",
     "head": [
      "Link speed",
      "Short (802.1D-1998) cost",
      "Long (802.1t) cost"
     ],
     "rows": [
      [
       "10 Mbps",
       "100",
       "2,000,000"
      ],
      [
       "100 Mbps",
       "19",
       "200,000"
      ],
      [
       "1 Gbps",
       "4",
       "20,000"
      ],
      [
       "10 Gbps",
       "2",
       "2,000"
      ]
     ],
     "title": "STP port costs by link speed"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "The **bridge ID** is 8 bytes: a 2-byte priority and the switch's 6-byte MAC. With per-VLAN spanning tree, 12 bits of the priority carry the VLAN number, so priority can only be set in **steps of 4096** and the displayed value is priority + VLAN ID (32768 + 10 = 32778 for VLAN 10).",
     "title": "Bridge ID and the extended system ID"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Classic STP",
       "items": [
        "Port states: blocking, listening, learning, forwarding, disabled",
        "Timer-driven: 30–50 seconds to converge",
        "Roles: root, designated, non-designated",
        "Topology changes relayed through the root"
       ]
      },
      {
       "title": "Rapid STP",
       "items": [
        "Port states: discarding, learning, forwarding",
        "Handshake-driven (proposal/agreement): typically under a few seconds",
        "Adds alternate and backup roles — pre-computed backups",
        "Edge ports go straight to forwarding"
       ]
      }
     ],
     "title": "802.1D STP vs Rapid STP (802.1w)"
    },
    {
     "type": "table",
     "head": [
      "Role",
      "State",
      "Meaning"
     ],
     "rows": [
      [
       "Root",
       "Forwarding",
       "Best path toward the root bridge (one per non-root switch)"
      ],
      [
       "Designated",
       "Forwarding",
       "Best port on a segment toward the root; forwards for that segment"
      ],
      [
       "Alternate",
       "Discarding",
       "Backup path to the root via another switch — takes over quickly"
      ],
      [
       "Backup",
       "Discarding",
       "Redundant port to a segment this switch already serves (rare)"
      ],
      [
       "Edge (PortFast)",
       "Forwarding",
       "Connects to an end device; no BPDUs expected"
      ]
     ],
     "title": "RSTP port roles"
    },
    {
     "type": "cli",
     "device": "Switch DS1 / AS1 · IOS-style CLI",
     "lines": [
      "DS1(config)# spanning-tree mode rapid-pvst",
      "DS1(config)# spanning-tree vlan 10,20,30 root primary",
      "DS2(config)# spanning-tree vlan 10,20,30 root secondary",
      "AS1(config)# spanning-tree mode rapid-pvst",
      "AS1(config)# interface range GigabitEthernet1/0/1 - 44",
      "AS1(config-if-range)# spanning-tree portfast",
      "AS1(config-if-range)# spanning-tree bpduguard enable"
     ],
     "title": "Placing the root and protecting edge ports",
     "note": "`rapid-pvst` runs a separate RSTP instance per VLAN in IOS-style CLI; the standards-based multi-instance alternative is MSTP (802.1s). `root primary` sets a priority low enough to win (24576 when no lower priority exists), and `root secondary` sets 28672 for the backup."
    },
    {
     "type": "cli",
     "device": "Switch AS1 · IOS-style CLI",
     "lines": [
      "AS1# show spanning-tree vlan 10",
      "VLAN0010",
      "  Spanning tree enabled protocol rstp",
      "  Root ID    Priority    24586",
      "             Address     0011.2233.4401",
      "             Cost        4",
      "             Port        23 (GigabitEthernet1/0/23)",
      "  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)",
      "Interface           Role Sts Cost      Prio.Nbr Type",
      "Gi1/0/1             Desg FWD 4         128.1    P2p Edge",
      "Gi1/0/23            Root FWD 4         128.23   P2p",
      "Gi1/0/24            Altn BLK 4         128.24   P2p"
     ],
     "title": "Verifying spanning tree for one VLAN",
     "note": "Root priority 24586 = 24576 + VLAN 10, so DS1 is root. Gi1/0/23 leads to the root; Gi1/0/24 is the alternate path, blocked until Gi1/0/23 fails. Gi1/0/1 is an edge port. (Short cost method shown; the long method would show 20000 for 1 Gbps.)"
    },
    {
     "type": "topology",
     "title": "Spanning tree for VLAN 10",
     "nodes": [
      {
       "id": "ds1",
       "kind": "l3switch",
       "label": "DS1 (root)",
       "sub": "Priority 24576 + 10",
       "x": 1,
       "y": 0
      },
      {
       "id": "ds2",
       "kind": "l3switch",
       "label": "DS2",
       "sub": "Priority 28672 + 10",
       "x": 5,
       "y": 0
      },
      {
       "id": "as1",
       "kind": "switch",
       "label": "AS1",
       "sub": "Priority 32768 + 10",
       "x": 3,
       "y": 3
      },
      {
       "id": "pc",
       "kind": "host",
       "label": "PC",
       "sub": "Edge port",
       "x": 3,
       "y": 5
      }
     ],
     "links": [
      {
       "a": "ds1",
       "b": "ds2",
       "label": "1G"
      },
      {
       "a": "ds1",
       "b": "as1",
       "label": "Root port",
       "bEnd": "Gi1/0/23"
      },
      {
       "a": "ds2",
       "b": "as1",
       "label": "Alternate · BLK",
       "style": "dashed",
       "bEnd": "Gi1/0/24"
      },
      {
       "a": "as1",
       "b": "pc",
       "label": "PortFast · Gi1/0/1"
      }
     ],
     "caption": "DS1 wins the root election. AS1 reaches it through Gi1/0/23 (root port); on the AS1–DS2 link the costs tie and DS2's lower bridge ID wins, so AS1's Gi1/0/24 becomes the alternate port and discards until Gi1/0/23 fails."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "PortFast skips the listening/learning wait. On a port connected to another switch it can create a temporary loop. Always pair it with **BPDU guard**, which err-disables the port the moment a BPDU arrives — turning a potential network-wide outage into one dead wall port.",
     "title": "PortFast only on edge ports"
    },
    {
     "type": "scenario",
     "situation": "`show spanning-tree` reveals that an old 100 Mbps access switch in a storeroom is the root bridge for every VLAN, because all switches use default priority and its MAC is lowest. Traffic between floors hairpins through it.",
     "options": [
      {
       "text": "Unplug the old switch so another becomes root",
       "feedback": "Election will simply pick the next-lowest MAC — the design is still left to chance.",
       "best": false
      },
      {
       "text": "Disable spanning tree to stop the hairpin",
       "feedback": "Without STP any redundant link would cause a broadcast storm.",
       "best": false
      },
      {
       "text": "Set the core/distribution switches as root primary and secondary for all VLANs",
       "feedback": "Correct. Lowering their priority makes the root deterministic and puts it at the centre of the topology.",
       "best": true
      },
      {
       "text": "Enable PortFast on the uplinks",
       "feedback": "PortFast belongs on edge ports only; it does not change root election.",
       "best": false
      }
     ],
     "title": "The root bridge is in a cupboard"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Ethernet has no TTL, so a layer 2 loop circles until links and CPUs saturate.",
      "Lowest bridge ID (priority, then MAC) is root; set root primary and secondary deliberately.",
      "Root ports point to the root, designated ports serve each segment, alternate ports wait in discarding state.",
      "RSTP converges in seconds through proposal and agreement; classic STP needs 30–50 seconds.",
      "PortFast only on edge ports — always with BPDU guard."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Switch A has priority 32768 and MAC 0011.1111.1111; Switch B has priority 28672 and MAC 0011.9999.9999. Which becomes root?",
       "options": [
        "Switch A, because its MAC address is lower",
        "Switch B, because its priority is lower",
        "Both switches share the root role",
        "Whichever switch booted first"
       ],
       "answer": 1,
       "explain": "Priority is compared before MAC, and 28672 < 32768. MAC only breaks ties, there is one root per instance, and boot order is irrelevant."
      },
      {
       "q": "Which RSTP port role is a pre-computed backup path toward the root bridge?",
       "options": [
        "Designated",
        "Edge",
        "Root",
        "Alternate"
       ],
       "answer": 3,
       "explain": "Alternate ports discard but can take over quickly if the root port fails. Designated and root ports forward, and edge ports face end devices."
      },
      {
       "q": "With per-VLAN spanning tree, which priority value can you configure?",
       "options": [
        "10000",
        "8192",
        "32770",
        "100"
       ],
       "answer": 1,
       "explain": "Priority must be a multiple of 4096 (0, 4096, 8192 …). The other values are not multiples of 4096."
      },
      {
       "q": "A user plugs a small switch into a port with PortFast and BPDU guard. What happens?",
       "options": [
        "The new switch becomes the root bridge",
        "The port moves to the alternate role",
        "The port is err-disabled when it receives a BPDU",
        "Spanning tree is disabled on the VLAN"
       ],
       "answer": 2,
       "explain": "BPDU guard shuts the port as soon as a BPDU arrives. Root election, alternate roles and disabling STP do not occur."
      },
      {
       "q": "How long does classic 802.1D STP typically take to move a port to forwarding after a topology change?",
       "options": [
        "30–50 seconds",
        "Less than one second",
        "Two to five minutes",
        "Exactly 2 seconds"
       ],
       "answer": 0,
       "explain": "Listening and learning each take 15 seconds of forward delay, plus up to 20 seconds of max age. Sub-second behaviour is RSTP-like; minutes or 2 seconds are wrong."
      },
      {
       "q": "Which is a classic sign of a layer 2 loop?",
       "options": [
        "CRC and input errors climbing on a single access port",
        "One VLAN missing from a trunk",
        "An SVI showing up/down",
        "The same MAC flaps between two ports"
       ],
       "answer": 3,
       "explain": "MAC flapping happens when looping frames arrive from different directions. CRC errors point to cabling or duplex, a missing VLAN to trunk config, and an up/down SVI to missing active ports."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l5",
   "title": "EtherChannel with LACP and Neighbour Discovery with LLDP",
   "subtitle": "Bundling links for bandwidth and resilience — and mapping who is connected to whom",
   "minutes": 26,
   "objectives": [
    "Explain why EtherChannel is used and how LACP negotiates a bundle",
    "Configure and verify a layer 2 LACP EtherChannel",
    "Use LLDP to discover and document neighbouring devices"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Connect two switches with two parallel links and spanning tree will block one of them. **EtherChannel** (link aggregation, IEEE 802.1AX — originally 802.3ad) bundles several physical links into one logical **port-channel**. STP sees one link, so all members forward, bandwidth adds up and losing one cable only reduces capacity."
    },
    {
     "type": "keypoints",
     "items": [
      "**More bandwidth** — up to 8 active members in one bundle on most platforms.",
      "**Resilience** — a failed member is removed in a moment; traffic shifts to the others.",
      "**Simpler STP** — one logical port, no blocked parallel links.",
      "**One place to configure** — trunk settings live on the port-channel interface."
     ],
     "title": "What link aggregation gives you"
    },
    {
     "type": "table",
     "head": [
      "Side A",
      "Side B",
      "Bundle forms?"
     ],
     "rows": [
      [
       "active",
       "active",
       "Yes"
      ],
      [
       "active",
       "passive",
       "Yes"
      ],
      [
       "passive",
       "passive",
       "No — nobody starts negotiation"
      ],
      [
       "on (static)",
       "on (static)",
       "Yes, but with no negotiation or error checking"
      ],
      [
       "on (static)",
       "active",
       "No — modes must both be static or both LACP"
      ]
     ],
     "title": "LACP mode combinations"
    },
    {
     "type": "cli",
     "device": "Switch AS1 · IOS-style CLI",
     "lines": [
      "AS1(config)# interface range GigabitEthernet1/0/23 - 24",
      "AS1(config-if-range)# channel-group 1 mode active",
      "AS1(config-if-range)# exit",
      "AS1(config)# interface Port-channel1",
      "AS1(config-if)# switchport mode trunk",
      "AS1(config-if)# switchport trunk native vlan 99",
      "AS1(config-if)# switchport trunk allowed vlan 10,20,30,50,99"
     ],
     "title": "Building a layer 2 LACP bundle",
     "note": "Configure the same on the neighbour (active or passive). Settings applied to Port-channel1 are inherited by the members."
    },
    {
     "type": "cli",
     "device": "Switch AS1 · IOS-style CLI",
     "lines": [
      "AS1# show etherchannel summary",
      "Flags:  D - down        P - bundled in port-channel",
      "        I - stand-alone s - suspended",
      "        S - Layer2      U - in use",
      "Number of channel-groups in use: 1",
      "Group  Port-channel  Protocol    Ports",
      "------+-------------+-----------+-----------------------------------",
      "1      Po1(SU)         LACP      Gi1/0/23(P)    Gi1/0/24(P)"
     ],
     "title": "Verifying the bundle",
     "note": "`Po1(SU)` = layer 2, in use. `(P)` on each member = bundled. A member showing `(s)` or `(I)` needs attention."
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Each frame is assigned to a member by hashing addresses (MAC, IP and/or ports). One large file transfer between two hosts therefore uses **one** member link; many flows spread across all members. A 2 × 1 Gbps bundle does not make a single download run at 2 Gbps.",
     "title": "Load balancing is per flow, not per packet"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Every member must have the same speed and duplex, the same mode (access or trunk), the same access VLAN or the same native and allowed VLANs. A mismatched port is suspended or left out of the bundle — and if bundling fails on only one side, you risk a loop.",
     "title": "Members must match"
    },
    {
     "type": "text",
     "text": "**LLDP (Link Layer Discovery Protocol, IEEE 802.1AB)** lets each device advertise its name, port, capabilities and management address to its directly connected neighbours. It is vendor-neutral, so switches, routers, APs, phones and servers from different makers can all see each other. **LLDP-MED** extensions tell IP phones which voice VLAN and power level to use."
    },
    {
     "type": "cli",
     "device": "Switch AS1 · IOS-style CLI",
     "lines": [
      "AS1(config)# lldp run",
      "AS1# show lldp neighbors",
      "Capability codes:",
      "    (R) Router, (B) Bridge, (T) Telephone, (W) WLAN Access Point, (S) Station",
      "Device ID           Local Intf     Hold-time  Capability      Port ID",
      "DS1                 Gi1/0/23       120        B,R             Gi1/0/5",
      "DS1                 Gi1/0/24       120        B,R             Gi1/0/6",
      "AP-2F-01            Gi1/0/7        120        W               eth0",
      "Total entries displayed: 3"
     ],
     "title": "Discovering neighbours with LLDP",
     "note": "LLDP advertisements are sent every 30 seconds by default and held for 120 seconds. `show lldp neighbors detail` adds IP addresses and software versions."
    },
    {
     "type": "topology",
     "title": "A bundled uplink, as LLDP reports it",
     "nodes": [
      {
       "id": "ds1",
       "kind": "l3switch",
       "label": "DS1",
       "sub": "Distribution",
       "x": 3,
       "y": 0
      },
      {
       "id": "as1",
       "kind": "switch",
       "label": "AS1",
       "sub": "Access, floor 2",
       "x": 3,
       "y": 2
      },
      {
       "id": "ap",
       "kind": "ap",
       "label": "AP-2F-01",
       "sub": "Wi-Fi AP",
       "x": 5,
       "y": 3
      },
      {
       "id": "pc",
       "kind": "host",
       "label": "Staff PC",
       "sub": "VLAN 10",
       "x": 1,
       "y": 4
      },
      {
       "id": "lap",
       "kind": "laptop",
       "label": "Laptop",
       "x": 5,
       "y": 5
      }
     ],
     "links": [
      {
       "a": "ds1",
       "b": "as1",
       "label": "Po1 · 2 × 1G LACP",
       "style": "bold",
       "bEnd": "Gi1/0/23-24"
      },
      {
       "a": "as1",
       "b": "ap",
       "aEnd": "Gi1/0/7",
       "bEnd": "eth0"
      },
      {
       "a": "as1",
       "b": "pc"
      },
      {
       "a": "ap",
       "b": "lap",
       "style": "wireless"
      }
     ],
     "caption": "Spanning tree sees Po1 as one link, so both members forward. AS1's LLDP table lists exactly these neighbours and ports — an easy way to check the drawing against reality."
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Run LLDP on all infrastructure ports and collect neighbour tables regularly — they rebuild a physical topology diagram automatically. Consider disabling it on ports facing untrusted users or the internet, since it reveals device details.",
     "title": "LLDP is your free documentation tool"
    },
    {
     "type": "scenario",
     "situation": "`show etherchannel summary` shows `Po1(SU)  LACP  Gi1/0/23(P)  Gi1/0/24(s)`. On Gi1/0/24 someone earlier configured `switchport trunk native vlan 1` directly on the member, while Port-channel1 uses native VLAN 99.",
     "options": [
      {
       "text": "Remove Gi1/0/24 from the bundle and leave it as a separate trunk",
       "feedback": "A separate parallel trunk will just be blocked by STP and wastes the link.",
       "best": false
      },
      {
       "text": "Make Gi1/0/24's settings match the port-channel (native VLAN 99), then confirm it shows (P)",
       "feedback": "Correct. Members must match; once consistent, LACP bundles the port.",
       "best": true
      },
      {
       "text": "Change the whole bundle to mode `on` to force it",
       "feedback": "Static mode removes the safety checks and can create loops if the other side does not agree.",
       "best": false
      },
      {
       "text": "Replace the cable on Gi1/0/24",
       "feedback": "The port is suspended for a configuration mismatch, not a physical fault.",
       "best": false
      }
     ],
     "title": "One member will not bundle"
    },
    {
     "type": "checklist",
     "title": "Switch deployment checklist (VLANs, trunks, STP, bundles)",
     "items": [
      "VLANs created and named exactly as in the VLAN plan",
      "All user ports set to `switchport mode access` with the correct data/voice VLAN",
      "Unused ports shut down and placed in a parking VLAN",
      "Trunks: same unused native VLAN both ends, explicit allowed list, negotiation off",
      "RSTP (or MSTP) enabled; root primary/secondary set on distribution/core",
      "PortFast + BPDU guard on every edge port, never on switch-to-switch links",
      "EtherChannel members identical; bundle shows (SU) with all members (P)",
      "LLDP enabled on infrastructure ports and neighbour table saved to documentation",
      "`show interfaces status` reviewed for err-disabled ports and duplex issues",
      "Configuration saved and backed up off the device"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Picture a switch closet you have seen (or your university lab). If one uplink cable were pulled out right now, what would happen to users — and which feature from this module (STP, RSTP, EtherChannel) would decide how long they noticed?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "MAC address table",
       "def": "Switch table mapping VLAN + MAC address to a port; also called the CAM table."
      },
      {
       "term": "Flooding",
       "def": "Sending a frame out every port in the VLAN except the arrival port (unknown unicast, broadcast)."
      },
      {
       "term": "Broadcast domain",
       "def": "The set of devices reached by a layer 2 broadcast — one VLAN."
      },
      {
       "term": "VLAN",
       "def": "A logical layer 2 network on shared switches; normally one IP subnet per VLAN."
      },
      {
       "term": "802.1Q",
       "def": "IEEE standard that inserts a 4-byte tag with a 12-bit VLAN ID into Ethernet frames on trunks."
      },
      {
       "term": "Native VLAN",
       "def": "The VLAN whose frames cross an 802.1Q trunk untagged; must match at both ends."
      },
      {
       "term": "SVI",
       "def": "Switched virtual interface — a layer 3 interface for a VLAN on a layer 3 switch."
      },
      {
       "term": "Router-on-a-stick",
       "def": "Inter-VLAN routing using one router trunk link with one subinterface per VLAN."
      },
      {
       "term": "Root bridge",
       "def": "The STP reference switch with the lowest bridge ID; all paths are measured toward it."
      },
      {
       "term": "Alternate port",
       "def": "RSTP discarding port that provides a ready backup path to the root."
      },
      {
       "term": "BPDU guard",
       "def": "Feature that err-disables an edge port if it receives a spanning-tree BPDU."
      },
      {
       "term": "LACP",
       "def": "Link Aggregation Control Protocol — negotiates EtherChannel bundles (active/passive)."
      },
      {
       "term": "LLDP",
       "def": "IEEE 802.1AB vendor-neutral protocol for advertising device identity to direct neighbours."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "EtherChannel bundles up to 8 matching links into one logical port that STP treats as a single link.",
      "LACP active/active or active/passive forms a bundle; passive/passive and on/active do not.",
      "Traffic is hashed per flow, so one flow never exceeds one member's speed.",
      "LLDP (802.1AB) is the vendor-neutral way to see and document direct neighbours."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Why do two parallel trunks between switches not double usable bandwidth without EtherChannel?",
       "options": [
        "STP blocks one link to prevent a loop",
        "Trunks can only carry one VLAN each",
        "LLDP disables the second link",
        "802.1Q tags halve the bandwidth"
       ],
       "answer": 0,
       "explain": "Spanning tree blocks the redundant path. Trunks carry many VLANs, LLDP only advertises information, and tags add just 4 bytes."
      },
      {
       "q": "Both sides of a link are set to LACP `passive`. What happens?",
       "options": [
        "The bundle forms normally",
        "No bundle forms",
        "The ports become static `on` members",
        "One side automatically becomes active"
       ],
       "answer": 1,
       "explain": "Passive only responds; with nobody initiating, LACP never negotiates. Modes do not change automatically and static `on` is a separate setting."
      },
      {
       "q": "A 2 × 10 Gbps LACP bundle carries one large backup flow between two servers. What speed can that single flow reach?",
       "options": [
        "Up to 20 Gbps",
        "Up to 5 Gbps",
        "Up to 10 Gbps",
        "Up to 1 Gbps"
       ],
       "answer": 2,
       "explain": "Hashing pins a flow to one member link, so a single flow is limited to one member's speed. Many flows together can use the full 20 Gbps."
      },
      {
       "q": "Which flag in `show etherchannel summary` means a member is actively bundled?",
       "options": [
        "s",
        "P",
        "I",
        "D"
       ],
       "answer": 1,
       "explain": "P = bundled. s = suspended, I = stand-alone and D = down."
      },
      {
       "q": "What information does LLDP provide about a directly connected neighbour?",
       "options": [
        "Its name, port ID and capabilities",
        "Its full routing table",
        "Every MAC address it has learned in each VLAN",
        "Its saved configuration file"
       ],
       "answer": 0,
       "explain": "LLDP advertises identity, port, capabilities and management address. It does not share routing tables, MAC tables or configurations."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m4",
 "order": 4,
 "code": "Route",
 "title": "Routing Essentials",
 "subtitle": "Routing tables, static and default routes, single-area OSPFv2 and first-hop redundancy",
 "outcomes": [
  "Read a routing table and apply longest-prefix match, administrative distance and metric",
  "Configure IPv4 and IPv6 static, default and floating static routes",
  "Explain OSPF neighbours, router ID, DR/BDR election and cost",
  "Configure and verify single-area OSPFv2 with passive interfaces and default-route origination",
  "Design and verify a VRRP-style redundant default gateway"
 ],
 "lessons": [
  {
   "id": "m4-l1",
   "title": "The Routing Table: Longest Match, Administrative Distance and Metrics",
   "subtitle": "How a router decides where every packet goes",
   "minutes": 28,
   "objectives": [
    "Describe the steps a router takes to forward a packet",
    "Read an IOS-style routing table, including codes, AD and metric",
    "Apply longest-prefix match to choose a route",
    "Explain how administrative distance and metric select routes for the table"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A router has one question for every packet: **which next hop and exit interface take this destination closest to its goal?** The answer comes from the **routing table**, a list of known destination prefixes and how to reach each one. Routes enter the table from three sources: directly connected interfaces, static routes typed by an engineer, and dynamic routing protocols such as OSPF."
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Receive",
       "text": "Frame arrives; FCS checked; layer 2 header removed."
      },
      {
       "label": "Check",
       "text": "IP header checked; TTL decreased by 1 (dropped at 0 with an ICMP time-exceeded message)."
      },
      {
       "label": "Look up",
       "text": "Longest-prefix match on the destination IP in the routing table."
      },
      {
       "label": "Resolve",
       "text": "Find the next hop's MAC address (ARP for IPv4, neighbor discovery for IPv6)."
      },
      {
       "label": "Send",
       "text": "Build a new frame for the outgoing link and transmit it."
      }
     ],
     "title": "What a router does with each packet"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1# show ip route",
      "Codes: L - local, C - connected, S - static, O - OSPF, * - candidate default",
      "Gateway of last resort is 203.0.113.1 to network 0.0.0.0",
      "S*    0.0.0.0/0 [1/0] via 203.0.113.1",
      "      10.0.0.0/8 is variably subnetted, 7 subnets, 5 masks",
      "C        10.0.12.0/30 is directly connected, GigabitEthernet0/1",
      "L        10.0.12.1/32 is directly connected, GigabitEthernet0/1",
      "C        10.0.13.0/30 is directly connected, GigabitEthernet0/2",
      "L        10.0.13.1/32 is directly connected, GigabitEthernet0/2",
      "S        10.2.0.0/16 [1/0] via 10.0.13.2",
      "O        10.2.20.0/24 [110/200] via 10.0.12.2, 00:12:44, GigabitEthernet0/1",
      "S        10.2.20.128/25 [1/0] via 10.0.13.2",
      "C        192.168.10.0/24 is directly connected, GigabitEthernet0/0",
      "L        192.168.10.1/32 is directly connected, GigabitEthernet0/0"
     ],
     "title": "Reading a routing table",
     "note": "In `[110/200]`, 110 is the administrative distance and 200 is the metric. `L` routes are the router's own interface addresses as /32 host routes. (The internet-facing connected route is trimmed from this listing.)"
    },
    {
     "type": "topology",
     "title": "R1 and its neighbours",
     "nodes": [
      {
       "id": "isp",
       "kind": "internet",
       "label": "ISP",
       "sub": "203.0.113.1 (default)",
       "x": 3,
       "y": 0
      },
      {
       "id": "lan",
       "kind": "switch",
       "label": "R1 LAN",
       "sub": "192.168.10.0/24",
       "x": 1,
       "y": 1
      },
      {
       "id": "r1",
       "kind": "router",
       "label": "R1",
       "x": 3,
       "y": 2
      },
      {
       "id": "r2",
       "kind": "router",
       "label": "R2",
       "sub": "OSPF: 10.2.20.0/24",
       "x": 1,
       "y": 4
      },
      {
       "id": "r3",
       "kind": "router",
       "label": "R3",
       "sub": "Static: 10.2.0.0/16, .128/25",
       "x": 5,
       "y": 4
      }
     ],
     "links": [
      {
       "a": "r1",
       "b": "isp",
       "label": "default"
      },
      {
       "a": "r1",
       "b": "lan",
       "aEnd": "Gi0/0"
      },
      {
       "a": "r1",
       "b": "r2",
       "label": "Gi0/1 · 10.0.12.0/30"
      },
      {
       "a": "r1",
       "b": "r3",
       "label": "Gi0/2 · 10.0.13.0/30"
      }
     ],
     "caption": "The table above in picture form: R2 is reached over Gi0/1, R3 over Gi0/2 and the ISP through the default route. Both R2 and R3 offer paths into 10.2.0.0, so prefix length decides which one a packet takes."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "When several routes contain the destination, the router uses the one with the **longest prefix length** (the most specific route), regardless of where it came from. A /25 beats a /24, which beats a /16, which beats the /0 default.",
     "title": "Longest-prefix match"
    },
    {
     "type": "table",
     "head": [
      "Destination",
      "Matching routes",
      "Chosen route",
      "Next hop"
     ],
     "rows": [
      [
       "10.2.20.130",
       "/0, /16, /24, /25",
       "10.2.20.128/25 (static)",
       "10.0.13.2"
      ],
      [
       "10.2.20.50",
       "/0, /16, /24",
       "10.2.20.0/24 (OSPF)",
       "10.0.12.2"
      ],
      [
       "10.2.99.7",
       "/0, /16",
       "10.2.0.0/16 (static)",
       "10.0.13.2"
      ],
      [
       "8.8.4.4",
       "/0 only",
       "0.0.0.0/0 (default)",
       "203.0.113.1"
      ],
      [
       "192.168.10.77",
       "/0, /24",
       "192.168.10.0/24 (connected)",
       "Direct on Gi0/0"
      ]
     ],
     "title": "Longest-prefix match on the table above"
    },
    {
     "type": "tree",
     "title": "Nested prefixes in R1's table",
     "root": {
      "label": "0.0.0.0/0",
      "text": "Default via 203.0.113.1",
      "children": [
       {
        "label": "10.2.0.0/16",
        "text": "Static via 10.0.13.2",
        "children": [
         {
          "label": "10.2.20.0/24",
          "text": "OSPF via 10.0.12.2",
          "children": [
           {
            "label": "10.2.20.128/25",
            "text": "Static via 10.0.13.2"
           }
          ]
         }
        ]
       },
       {
        "label": "192.168.10.0/24",
        "text": "Connected, Gi0/0"
       },
       {
        "label": "10.0.12.0/30, 10.0.13.0/30",
        "text": "Connected WAN links"
       }
      ]
     },
     "caption": "Each route sits inside a shorter one. A packet follows the deepest box that still contains its destination: 10.2.20.130 matches all of them and uses the /25, while 10.2.20.50 stops at the /24."
    },
    {
     "type": "table",
     "head": [
      "Route source",
      "AD",
      "Notes"
     ],
     "rows": [
      [
       "Connected interface",
       "0",
       "Most trusted"
      ],
      [
       "Static route",
       "1",
       "Can be raised manually (floating static)"
      ],
      [
       "External BGP",
       "20",
       "Routes from another organisation's network"
      ],
      [
       "OSPF",
       "110",
       "Link-state interior protocol"
      ],
      [
       "IS-IS",
       "115",
       "Link-state interior protocol"
      ],
      [
       "RIP",
       "120",
       "Legacy distance-vector protocol"
      ],
      [
       "Internal BGP",
       "200",
       "Routes learned from peers in the same organisation"
      ],
      [
       "Unknown / unusable",
       "255",
       "Never installed"
      ]
     ],
     "title": "Default administrative distances (IOS-style platforms)"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "These are common defaults on IOS-style devices. Other platforms use different numbers (some give OSPF internal routes 10, for example). The **idea** is universal: a lower value means a more trusted source. Always check the platform you are working on.",
     "title": "AD values are not universal"
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Administrative distance",
       "items": [
        "Compares **different sources** offering the same prefix",
        "Example: static (1) vs OSPF (110) for 10.5.0.0/16",
        "Local to one router; not advertised",
        "Lower wins"
       ]
      },
      {
       "title": "Metric",
       "items": [
        "Compares **paths within one protocol**",
        "Example: OSPF cost 20 vs cost 30",
        "Calculated by the protocol (OSPF: sum of interface costs)",
        "Lower wins; equal metrics can load-share (ECMP)"
       ]
      }
     ],
     "title": "Administrative distance vs metric"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Each source offers its best path",
       "text": "OSPF runs SPF and offers its lowest-cost path; static routes offer themselves."
      },
      {
       "title": "Same prefix from several sources?",
       "text": "The source with the lowest administrative distance is installed."
      },
      {
       "title": "Same prefix, same source, equal metrics?",
       "text": "Several next hops are installed (equal-cost multipath)."
      },
      {
       "title": "Forwarding",
       "text": "For each packet, longest-prefix match picks among everything installed."
      }
     ],
     "title": "How routes get into the table and get used"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "10.2.20.0/24 from OSPF and 10.2.0.0/16 from a static route are **both** installed — they are different prefixes. AD only matters when the prefix *and* the length are identical. Mixing these two ideas up is the most common routing exam mistake.",
     "title": "Different prefixes never compete on AD"
    },
    {
     "type": "scenario",
     "situation": "Traffic to server 10.2.20.140 goes through R3 (10.0.13.2), but the team expected it to follow OSPF through R2. The table is the one shown above.",
     "options": [
      {
       "text": "The static 10.2.20.128/25 is the longest match for 10.2.20.140, so it is used",
       "feedback": "Correct. .140 falls inside .128/25, which is more specific than the OSPF /24. Remove or correct the /25 if it is no longer wanted.",
       "best": true
      },
      {
       "text": "OSPF has a worse administrative distance than static, so static always wins",
       "feedback": "AD is irrelevant here: the static /25 and the OSPF /24 are different prefixes.",
       "best": false
      },
      {
       "text": "The default route is preferred for unknown servers",
       "feedback": "The default is used only when nothing more specific matches.",
       "best": false
      },
      {
       "text": "OSPF routes are ignored when a static default exists",
       "feedback": "OSPF routes remain installed and are used whenever they are the longest match.",
       "best": false
      }
     ],
     "title": "The unexpected path"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Routes come from connected interfaces, static configuration and dynamic protocols.",
      "Forwarding always uses the longest matching prefix, whatever its source.",
      "Administrative distance only compares different sources offering the identical prefix; metric compares paths inside one protocol.",
      "A router decrements TTL, looks up the destination, resolves the next hop's MAC and builds a new frame."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A router has routes 172.16.0.0/16, 172.16.4.0/22 and 172.16.4.0/24. Which route does a packet to 172.16.5.9 use?",
       "options": [
        "172.16.4.0/24",
        "172.16.0.0/16",
        "The default route",
        "172.16.4.0/22"
       ],
       "answer": 3,
       "explain": "172.16.4.0/22 covers 172.16.4.0 – 172.16.7.255, so it contains .5.9 and is longer than /16. The /24 covers only 172.16.4.x, and the default is used only when nothing else matches."
      },
      {
       "q": "The same prefix 10.9.0.0/16 is learned from OSPF and from a static route with default settings. Which is installed?",
       "options": [
        "The OSPF route",
        "Both, load-sharing traffic",
        "The static route",
        "Neither, because they conflict"
       ],
       "answer": 2,
       "explain": "Same prefix, different sources: the lower AD (static 1 vs OSPF 110) wins. Load sharing happens only within one source with equal metrics, and conflicts are resolved by AD."
      },
      {
       "q": "In `O 10.2.20.0/24 [110/200] via 10.0.12.2`, what does 200 represent?",
       "options": [
        "The administrative distance",
        "The route age in seconds",
        "The interface bandwidth",
        "The OSPF cost metric"
       ],
       "answer": 3,
       "explain": "The second number is the metric. 110 is the AD, the age appears later in the line, and bandwidth is not shown here."
      },
      {
       "q": "What does a router do when a packet's TTL reaches 0?",
       "options": [
        "Forwards it using the default route",
        "Resets the TTL to 255 and forwards it",
        "Drops it and sends ICMP time exceeded to the source",
        "Floods it to every interface"
       ],
       "answer": 2,
       "explain": "TTL prevents endless routing loops; at 0 the packet is discarded and the sender is informed. Routers never reset TTL or flood packets."
      },
      {
       "q": "What do `L` entries in an IOS-style routing table represent?",
       "options": [
        "Routes learned from LLDP neighbours",
        "The router's own interface addresses as /32s",
        "Load-balanced routes",
        "Legacy routes from a deleted protocol"
       ],
       "answer": 1,
       "explain": "Local routes mark the exact addresses configured on the router's interfaces. They are not from LLDP, not a load-balancing marker, and not legacy entries."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l2",
   "title": "Static and Default Routes for IPv4 and IPv6",
   "subtitle": "Next-hop, exit-interface, default and floating static routes",
   "minutes": 28,
   "objectives": [
    "Configure IPv4 and IPv6 static routes, including default routes",
    "Choose between next-hop and exit-interface forms",
    "Build a floating static route as a backup path and explain its limits",
    "Troubleshoot missing return routes"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A **static route** is a route you type by hand. It never changes unless you change it, uses no bandwidth or CPU for routing updates, and is perfectly predictable. That makes it ideal for small or stub networks, for the default route to an ISP and for backup paths — and a poor fit for large networks that change often."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Static",
       "items": [
        "Configured manually per router",
        "No overhead, very predictable",
        "Does not react to failures beyond the local link",
        "Best for stub sites, defaults and backups"
       ]
      },
      {
       "title": "Dynamic (e.g. OSPF)",
       "items": [
        "Routers exchange reachability automatically",
        "Adapts to failures and new subnets",
        "Uses some CPU, memory and bandwidth",
        "Best for networks with several paths or many prefixes"
       ]
      }
     ],
     "title": "Static vs dynamic routing"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "! network route via a next-hop address",
      "R1(config)# ip route 10.2.0.0 255.255.0.0 10.0.12.2",
      "! host route (/32) to one server",
      "R1(config)# ip route 10.9.9.10 255.255.255.255 10.0.13.2",
      "! fully specified: exit interface plus next hop",
      "R1(config)# ip route 10.3.0.0 255.255.0.0 GigabitEthernet0/2 10.0.13.2",
      "! default route to the ISP",
      "R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1"
     ],
     "title": "IPv4 static and default routes",
     "note": "A next-hop route needs a second lookup to find the exit interface (a recursive lookup). The fully specified form avoids that and is clearest on multi-access Ethernet links."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "`ip route 10.3.0.0 255.255.0.0 GigabitEthernet0/2` (no next hop) tells the router every destination in 10.3.0.0/16 is directly on that segment. On Ethernet it must then ARP for each destination and relies on the neighbour answering by proxy ARP. Use it only on true point-to-point links; on Ethernet give a next hop.",
     "title": "Exit-interface-only routes on Ethernet"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# ipv6 unicast-routing",
      "R1(config)# ipv6 route 2001:db8:acad:200::/56 2001:db8:0:12::2",
      "R1(config)# ipv6 route 2001:db8:acad:300::/56 GigabitEthernet0/2 fe80::3",
      "R1(config)# ipv6 route ::/0 2001:db8:ffff:1::1",
      "R1(config)# end",
      "R1# show ipv6 route static",
      "S   2001:DB8:ACAD:200::/56 [1/0]",
      "     via 2001:DB8:0:12::2",
      "S   2001:DB8:ACAD:300::/56 [1/0]",
      "     via FE80::3, GigabitEthernet0/2",
      "S   ::/0 [1/0]",
      "     via 2001:DB8:FFFF:1::1"
     ],
     "title": "IPv6 static and default routes",
     "note": "When the next hop is a link-local address you **must** name the exit interface too, because the same fe80:: address can exist on every link."
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Normal",
       "text": "Primary default via ISP-1 (AD 1) is installed; backup via ISP-2 (AD 10) waits."
      },
      {
       "label": "Failure",
       "text": "The link to ISP-1 goes down; its route is removed from the table."
      },
      {
       "label": "Failover",
       "text": "The backup route with AD 10 is now the best and is installed."
      },
      {
       "label": "Recovery",
       "text": "ISP-1 link returns; the AD 1 route reappears and displaces the backup."
      }
     ],
     "title": "Floating static route: primary and backup"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1",
      "R1(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.1 10",
      "R1# show ip route static | include 0.0.0.0",
      "S*    0.0.0.0/0 [1/0] via 203.0.113.1"
     ],
     "title": "Configuring a floating static default",
     "note": "Only the AD 1 route appears while it is valid. The trailing `10` raises the backup's AD; to float behind a route learned by OSPF (AD 110), the backup's AD must be higher than 110."
    },
    {
     "type": "topology",
     "title": "Primary and floating default routes",
     "nodes": [
      {
       "id": "inet",
       "kind": "internet",
       "label": "Internet",
       "x": 3,
       "y": 0
      },
      {
       "id": "i1",
       "kind": "router",
       "label": "ISP-1",
       "sub": "203.0.113.1",
       "x": 1,
       "y": 1.5
      },
      {
       "id": "i2",
       "kind": "router",
       "label": "ISP-2",
       "sub": "198.51.100.1",
       "x": 5,
       "y": 1.5
      },
      {
       "id": "r1",
       "kind": "router",
       "label": "R1",
       "sub": "Branch edge",
       "x": 3,
       "y": 3
      },
      {
       "id": "lan",
       "kind": "host",
       "label": "Branch LAN",
       "x": 3,
       "y": 5
      }
     ],
     "links": [
      {
       "a": "i1",
       "b": "inet"
      },
      {
       "a": "i2",
       "b": "inet"
      },
      {
       "a": "r1",
       "b": "i1",
       "label": "Primary · AD 1",
       "style": "bold"
      },
      {
       "a": "r1",
       "b": "i2",
       "label": "Backup · AD 10",
       "style": "dashed"
      },
      {
       "a": "r1",
       "b": "lan"
      }
     ],
     "caption": "Only the AD 1 route is installed while the link to ISP-1 is up. If ISP-1 fails beyond its own router, R1's interface stays up and traffic is black-holed — that is why production designs add reachability tracking."
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A static route is removed when its exit interface goes down or its next hop becomes unreachable in the table. If the provider fails *beyond* your directly connected link, the interface stays up and the primary route stays — traffic is black-holed. Production designs add **reachability tracking** (probes that remove the route when a far-end test fails) or use a dynamic protocol.",
     "title": "Floating statics only see local failures"
    },
    {
     "type": "table",
     "head": [
      "Type",
      "Example prefix",
      "Typical use"
     ],
     "rows": [
      [
       "Network route",
       "10.2.0.0/16",
       "Reach a remote site or block"
      ],
      [
       "Host route",
       "10.9.9.10/32",
       "Steer traffic to one server or loopback"
      ],
      [
       "Default route",
       "0.0.0.0/0 · ::/0",
       "Send everything unknown to the ISP or core"
      ],
      [
       "Summary route",
       "10.0.0.0/8",
       "One route covering many subnets behind one next hop"
      ],
      [
       "Floating static",
       "Any, with a raised AD",
       "Backup path that appears only when the primary disappears"
      ]
     ],
     "title": "Kinds of static route"
    },
    {
     "type": "scenario",
     "situation": "The branch router BR1 has a default route to HQ. A branch PC (10.40.1.20) pings an HQ server (10.1.1.10): the request reaches the server (a capture there proves it) but replies never arrive. HQ router HQ1 has routes for its own subnets and a default to the internet.",
     "options": [
      {
       "text": "Add a route on BR1 for 10.1.1.0/24",
       "feedback": "BR1 already reaches the server through its default route — the request arrives.",
       "best": false
      },
      {
       "text": "Change the server's default gateway to BR1",
       "feedback": "BR1 is not on the server's subnet; that would break the server entirely.",
       "best": false
      },
      {
       "text": "Add a route on HQ1 for the branch prefix 10.40.0.0/16 via the WAN link to BR1",
       "feedback": "Correct. Without a return route, HQ1 sends replies to its internet default. Routing must work in both directions.",
       "best": true
      },
      {
       "text": "Increase the AD of HQ1's default route",
       "feedback": "AD does not create a route to the branch; it would only affect route selection.",
       "best": false
      }
     ],
     "title": "Ping times out one way"
    },
    {
     "type": "template",
     "title": "Routing table worksheet",
     "purpose": "Plan or audit every route on a router: what it reaches, how, and why it exists.",
     "columns": [
      "Router",
      "Destination prefix",
      "Next hop / exit interface",
      "Source (C/S/O)",
      "AD / metric",
      "Purpose / backup for"
     ],
     "example": [
      [
       "BR1",
       "0.0.0.0/0",
       "10.0.40.1 (WAN to HQ)",
       "S",
       "1 / 0",
       "Primary default to HQ"
      ],
      [
       "BR1",
       "0.0.0.0/0",
       "100.64.7.1 (4G router)",
       "S",
       "10 / 0",
       "Floating backup if WAN fails"
      ]
     ],
     "rows": 8
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Static routes are predictable and free of overhead — ideal for stubs, defaults and backups.",
      "Default routes are 0.0.0.0/0 and ::/0; IPv6 link-local next hops need the exit interface too.",
      "A floating static has a higher AD than the route it backs up and appears only when that route disappears.",
      "Statics only see local failures; add tracking or a dynamic protocol for remote ones.",
      "Routing must work in both directions — always check the return route."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which command creates an IPv4 default route to 198.51.100.1?",
       "options": [
        "`ip route 0.0.0.0 0.0.0.0 198.51.100.1`",
        "`ip route 198.51.100.1 0.0.0.0 0.0.0.0`",
        "`ip default 198.51.100.1 255.255.255.255`",
        "`ip route 0.0.0.0 255.255.255.255 198.51.100.1`"
       ],
       "answer": 0,
       "explain": "A default route is prefix 0.0.0.0 with mask 0.0.0.0, followed by the next hop. The other options reverse the fields, use invented syntax or give a /32 mask."
      },
      {
       "q": "A primary default route is static (AD 1). What AD should a backup static default use to float?",
       "options": [
        "Exactly 1, the same as the primary",
        "Any value above 1, such as 10",
        "0, so it is always preferred",
        "255, so it is always installed"
       ],
       "answer": 1,
       "explain": "The backup must have a worse (higher) AD than the primary. Equal AD would load-share, 0 is reserved for connected routes, and 255 means never installed."
      },
      {
       "q": "Why must an IPv6 static route using a link-local next hop also name the exit interface?",
       "options": [
        "The same link-local address can exist on many links",
        "Link-local addresses cannot be pinged",
        "IPv6 static routes always need two next hops",
        "Link-local next hops are only valid for multicast traffic"
       ],
       "answer": 0,
       "explain": "Link-local addresses are unique only per link, so the router needs the interface to know which link. They can be pinged, one next hop is enough, and they are unicast."
      },
      {
       "q": "A floating static default should take over when the ISP fails beyond your directly connected link. What is missing?",
       "options": [
        "A lower AD on the floating route",
        "A /32 host route to the ISP router",
        "IPv6 enabled on the WAN link",
        "Reachability tracking for the primary route"
       ],
       "answer": 3,
       "explain": "Without tracking, the primary stays installed while its interface is up. Lowering the backup's AD would make it primary, a host route does not detect remote failure, and IPv6 is unrelated."
      },
      {
       "q": "Branch pings reach HQ but replies never return. What is the most likely cause?",
       "options": [
        "The branch PC's DNS server is wrong",
        "The HQ switch has PortFast enabled",
        "HQ has no route back to the branch subnet",
        "The branch router uses a host route instead of a network route"
       ],
       "answer": 2,
       "explain": "One-way success points to a missing return route. DNS is not used for ping by IP, PortFast does not drop replies, and a host route at the branch would not stop return traffic."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l3",
   "title": "OSPFv2 Concepts: Neighbours, Router ID, DR/BDR and Cost",
   "subtitle": "How single-area OSPF discovers neighbours and computes best paths",
   "minutes": 30,
   "objectives": [
    "Explain how OSPF forms adjacencies and builds a link-state database",
    "List the parameters that must match for neighbours to form",
    "Predict the router ID, the DR and the BDR on a segment",
    "Calculate OSPF cost from interface bandwidth and reference bandwidth"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "**OSPF (Open Shortest Path First, OSPFv2 for IPv4)** is the most widely deployed open interior routing protocol. Each router describes its links in **link-state advertisements (LSAs)**; all routers in an area hold the same **link-state database (LSDB)** and each runs the **SPF (Dijkstra) algorithm** to compute its own shortest path to every prefix. In this course you work with a single area: **area 0, the backbone**."
    },
    {
     "type": "keypoints",
     "items": [
      "Open standard (OSPFv2 is defined in RFC 2328); runs directly over IP as protocol 89.",
      "Metric is **cost**, based on interface bandwidth; lower total cost wins.",
      "Hellos to multicast **224.0.0.5** discover neighbours; DR/BDR listen on **224.0.0.6**.",
      "Converges fast and sends updates only when something changes (plus periodic refresh).",
      "Areas let large networks scale; small and medium networks often use area 0 only."
     ],
     "title": "OSPF in one minute"
    },
    {
     "type": "table",
     "head": [
      "State",
      "What is happening"
     ],
     "rows": [
      [
       "Down",
       "No hellos received from this neighbour yet"
      ],
      [
       "Init",
       "A hello arrived, but it does not list our router ID yet"
      ],
      [
       "2-Way",
       "Each router sees itself in the other's hello — bidirectional; DR/BDR election happens here"
      ],
      [
       "ExStart",
       "Routers agree who leads the database exchange (MTU problems often stall here)"
      ],
      [
       "Exchange",
       "Database description packets summarise each LSDB"
      ],
      [
       "Loading",
       "Missing LSAs are requested and received"
      ],
      [
       "Full",
       "Databases are synchronised — the adjacency is complete"
      ]
     ],
     "title": "Neighbour states from first hello to full adjacency"
    },
    {
     "type": "sequence",
     "title": "From first hello to Full",
     "actors": [
      "R1 (RID 1.1.1.1)",
      "R2 (RID 2.2.2.2)"
     ],
     "steps": [
      {
       "from": 0,
       "to": 1,
       "label": "Hello (seen: none)",
       "note": "R2 moves to Init"
      },
      {
       "from": 1,
       "to": 0,
       "label": "Hello (seen: 1.1.1.1)",
       "note": "R1 moves to 2-Way",
       "reply": true
      },
      {
       "from": 0,
       "to": 1,
       "label": "Hello (seen: 2.2.2.2)",
       "note": "2-Way; DR/BDR chosen if needed"
      },
      {
       "from": 1,
       "to": 0,
       "label": "DBD: who leads?",
       "note": "ExStart (MTU checked)",
       "reply": true
      },
      {
       "from": 0,
       "to": 1,
       "label": "DBD: summary of my LSDB",
       "note": "Exchange"
      },
      {
       "from": 0,
       "to": 1,
       "label": "LSR: LSAs I lack",
       "note": "Loading"
      },
      {
       "from": 1,
       "to": 0,
       "label": "LSU: requested LSAs",
       "reply": true
      },
      {
       "from": 0,
       "to": 1,
       "label": "LSAck",
       "note": "both routers now Full"
      }
     ],
     "caption": "Hello timers, area or authentication mismatches stop the process at the hellos; an MTU mismatch stalls it at ExStart/Exchange. Between two DROTHERs the process deliberately stops at 2-Way."
    },
    {
     "type": "table",
     "head": [
      "Parameter",
      "Default on Ethernet",
      "If mismatched"
     ],
     "rows": [
      [
       "Area ID",
       "—",
       "Hellos ignored; no neighbour"
      ],
      [
       "Subnet and mask on the link",
       "—",
       "No neighbour on broadcast links"
      ],
      [
       "Hello / dead intervals",
       "10 s / 40 s",
       "No neighbour"
      ],
      [
       "Authentication type and key",
       "None",
       "No neighbour"
      ],
      [
       "Area type (e.g. stub flag)",
       "Normal",
       "No neighbour"
      ],
      [
       "Interface MTU",
       "1500",
       "Neighbour stuck in ExStart/Exchange"
      ],
      [
       "Router IDs",
       "Must be unique",
       "Unstable adjacencies and route errors"
      ]
     ],
     "title": "Must match for an adjacency to form"
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Manual",
       "text": "The `router-id` command — always the best practice."
      },
      {
       "title": "Highest loopback",
       "text": "If none is set, the highest IPv4 address on any up loopback interface."
      },
      {
       "title": "Highest active interface",
       "text": "If no loopback exists, the highest IPv4 address on an up physical interface."
      },
      {
       "title": "Changing it",
       "text": "A new router ID takes effect only after the OSPF process restarts (e.g. `clear ip ospf process`)."
      }
     ],
     "title": "How a router chooses its OSPF router ID"
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "On multi-access segments such as Ethernet, OSPF elects a **designated router (DR)** and a **backup DR (BDR)**. Every other router (a **DROTHER**) forms a full adjacency only with the DR and BDR, not with each other. This cuts the number of adjacencies and LSAs on busy segments.",
     "title": "DR and BDR"
    },
    {
     "type": "topology",
     "title": "DR and BDR on a shared Ethernet segment",
     "nodes": [
      {
       "id": "r1",
       "kind": "router",
       "label": "R1 · DROTHER",
       "sub": "Pri 1 · RID 1.1.1.1",
       "x": 1,
       "y": 0
      },
      {
       "id": "r2",
       "kind": "router",
       "label": "R2 · DR",
       "sub": "Pri 100 · RID 2.2.2.2",
       "x": 5,
       "y": 0
      },
      {
       "id": "sw",
       "kind": "switch",
       "label": "Shared segment",
       "sub": "10.0.123.0/24",
       "x": 3,
       "y": 2
      },
      {
       "id": "r3",
       "kind": "router",
       "label": "R3 · DROTHER",
       "sub": "Pri 0 · RID 3.3.3.3",
       "x": 1,
       "y": 4
      },
      {
       "id": "r4",
       "kind": "router",
       "label": "R4 · BDR",
       "sub": "Pri 1 · RID 4.4.4.4",
       "x": 5,
       "y": 4
      }
     ],
     "links": [
      {
       "a": "r1",
       "b": "sw"
      },
      {
       "a": "r2",
       "b": "sw"
      },
      {
       "a": "r3",
       "b": "sw"
      },
      {
       "a": "r4",
       "b": "sw"
      }
     ],
     "caption": "The highest priority wins DR (R2); the next best becomes BDR, where R4 beats R1 on router ID; priority 0 never takes part. R1 and R3 are full neighbours of the DR and BDR only and stay 2-Way with each other."
    },
    {
     "type": "keypoints",
     "items": [
      "Highest interface **OSPF priority** wins (default 1; range 0–255).",
      "Priority **0** means the router never becomes DR or BDR.",
      "Tie: highest **router ID** wins.",
      "Election is **not pre-emptive** — a better router joining later does not take over until the DR fails or OSPF restarts.",
      "DROTHERs stay in **2-Way** with each other; that is normal, not a fault.",
      "Point-to-point links (or interfaces set to point-to-point) elect no DR/BDR."
     ],
     "title": "DR/BDR election rules"
    },
    {
     "type": "formula",
     "items": [
      {
       "name": "Interface cost",
       "expr": "cost = reference bandwidth ÷ interface bandwidth (minimum 1)",
       "meaning": "Default reference is 100 Mbps, so 100 Mbps, 1 Gbps and 10 Gbps all get cost 1."
      },
      {
       "name": "Better reference",
       "expr": "auto-cost reference-bandwidth 100000 (Mbps)",
       "meaning": "With a 100 Gbps reference: 100 Gbps = 1, 10 Gbps = 10, 1 Gbps = 100, 100 Mbps = 1000."
      },
      {
       "name": "Path cost",
       "expr": "sum of outgoing interface costs along the path",
       "meaning": "The router adds the cost of each interface the packet leaves through toward the destination."
      }
     ],
     "title": "OSPF cost"
    },
    {
     "type": "table",
     "head": [
      "Interface",
      "Reference 100 Mbps (default)",
      "Reference 100 Gbps"
     ],
     "rows": [
      [
       "100 Mbps",
       "1",
       "1000"
      ],
      [
       "1 Gbps",
       "1",
       "100"
      ],
      [
       "10 Gbps",
       "1",
       "10"
      ],
      [
       "100 Gbps",
       "1",
       "1"
      ]
     ],
     "title": "Cost with each reference bandwidth"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "With the default reference, OSPF cannot tell a 1 Gbps link from a 100 Gbps link and may choose a slow path. Raise the reference on **every** router in the area, otherwise routers compute costs on different scales and paths become inconsistent.",
     "title": "Set the same reference bandwidth everywhere"
    },
    {
     "type": "scenario",
     "situation": "R1 and R2 share 10.0.12.0/30. `show ip ospf neighbor` on both is empty. Debug output shows R1 receiving hellos from R2 with hello 5 s, dead 20 s; R1 uses 10 s / 40 s. Area, subnet and authentication all match.",
     "options": [
      {
       "text": "Make the hello and dead intervals identical on both interfaces",
       "feedback": "Correct. Timer mismatches cause hellos to be rejected; matching them lets the routers reach Full.",
       "best": true
      },
      {
       "text": "Change R1's router ID to be higher than R2's",
       "feedback": "Router ID values do not stop adjacencies, as long as they are unique.",
       "best": false
      },
      {
       "text": "Set the OSPF priority to 0 on both",
       "feedback": "Priority affects DR election, not whether neighbours form — and a /30 link usually does not need a DR.",
       "best": false
      },
      {
       "text": "Increase the reference bandwidth on R1",
       "feedback": "Costs do not need to match for adjacency, though consistency matters for path choice.",
       "best": false
      }
     ],
     "title": "Neighbours that never meet"
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "OSPF routers flood LSAs, keep identical LSDBs per area and each run SPF to find lowest-cost paths.",
      "Area, subnet, hello/dead timers, authentication and area type must match; MTU mismatches stall at ExStart/Exchange.",
      "Router ID: manual, else highest loopback, else highest active interface — and it changes only on process restart.",
      "DR/BDR: highest priority, then highest router ID; not pre-emptive; priority 0 never becomes DR.",
      "Set the same reference bandwidth on every router so fast links get lower costs."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which OSPF neighbour state shows that databases are fully synchronised?",
       "options": [
        "2-Way",
        "Full",
        "ExStart",
        "Loading"
       ],
       "answer": 1,
       "explain": "Full means the LSDBs match. 2-Way is bidirectional hello contact, ExStart negotiates the exchange, and Loading is still requesting LSAs."
      },
      {
       "q": "A router has no `router-id` command, loopbacks 10.255.0.3 and 10.255.0.9, and interfaces up with 192.168.1.1 and 172.16.0.1. What is its router ID?",
       "options": [
        "192.168.1.1",
        "10.255.0.3",
        "10.255.0.9",
        "172.16.0.1"
       ],
       "answer": 2,
       "explain": "With no manual ID, the highest up loopback address is used: 10.255.0.9. Physical addresses are considered only when no loopback exists."
      },
      {
       "q": "Two DROTHERs on the same Ethernet segment show each other in state 2-WAY. What does this mean?",
       "options": [
        "Their MTUs do not match",
        "Their hello and dead timers do not match",
        "Authentication has failed",
        "This is normal behaviour for DROTHERs"
       ],
       "answer": 3,
       "explain": "DROTHERs fully adjoin only the DR and BDR, so 2-Way between them is expected. MTU problems stall in ExStart/Exchange, and timer or authentication mismatches prevent any neighbour state."
      },
      {
       "q": "Using the default reference bandwidth, what is the OSPF cost of a 10 Gbps interface?",
       "options": [
        "1",
        "10",
        "100",
        "0.01"
       ],
       "answer": 0,
       "explain": "100 Mbps ÷ 10,000 Mbps is below 1, and cost cannot go below 1. 10 would require a 100 Gbps reference, 100 a 1 Tbps reference, and fractional costs are not allowed."
      },
      {
       "q": "On a shared Ethernet segment, which router becomes DR when all priorities are default?",
       "options": [
        "The router with the highest router ID",
        "The router with the lowest router ID",
        "The router that has the most neighbours",
        "The router with the fastest interface"
       ],
       "answer": 0,
       "explain": "With equal priority 1, the highest router ID wins. Neighbour count and interface speed are not election criteria."
      },
      {
       "q": "Which mismatch typically leaves two OSPF neighbours stuck in ExStart or Exchange?",
       "options": [
        "Interface description",
        "Interface MTU",
        "OSPF process ID",
        "Router hostname"
       ],
       "answer": 1,
       "explain": "MTU mismatches break database description exchange. Descriptions and hostnames are irrelevant, and process IDs are locally significant and need not match."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l4",
   "title": "Configuring and Verifying Single-Area OSPF",
   "subtitle": "From `router ospf` to a full routing table — and how to prove it works",
   "minutes": 32,
   "objectives": [
    "Enable OSPFv2 with network statements or per-interface commands",
    "Use wildcard masks, passive interfaces and default-route origination correctly",
    "Verify neighbours, interfaces, costs and OSPF routes with show commands"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Configuring OSPF takes a handful of lines. The skill lies in enabling it on exactly the right interfaces, keeping hellos off user LANs, setting sensible costs and then **proving** with show commands that every neighbour and route is what you expect."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "OSPF `network` statements use a **wildcard mask** — the inverse of a subnet mask. A 0 bit means \"must match\" and a 1 bit means \"don't care\". For a /24 the wildcard is `0.0.0.255`; for a /30 it is `0.0.0.3`. Quick method: 255.255.255.255 minus the subnet mask.",
     "title": "Wildcard mask"
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1(config)# router ospf 1",
      "R1(config-router)# router-id 1.1.1.1",
      "R1(config-router)# auto-cost reference-bandwidth 100000",
      "R1(config-router)# network 10.0.12.0 0.0.0.3 area 0",
      "R1(config-router)# network 10.0.13.0 0.0.0.3 area 0",
      "R1(config-router)# network 192.168.10.0 0.0.0.255 area 0",
      "R1(config-router)# passive-interface GigabitEthernet0/0",
      "R1(config-router)# default-information originate",
      "R1(config-router)# interface GigabitEthernet0/1",
      "R1(config-if)# ip ospf network point-to-point"
     ],
     "title": "OSPF with network statements",
     "note": "Any interface whose address matches a `network` statement joins area 0. The process ID (1) is local only. `passive-interface` advertises the LAN subnet but sends no hellos to users. `default-information originate` advertises R1's static default route into OSPF. Gi0/1 is set to point-to-point to match R2's end of the link."
    },
    {
     "type": "cli",
     "device": "R2 · IOS-style CLI",
     "lines": [
      "R2(config)# router ospf 1",
      "R2(config-router)# router-id 2.2.2.2",
      "R2(config-router)# auto-cost reference-bandwidth 100000",
      "R2(config-router)# passive-interface GigabitEthernet0/0",
      "R2(config-router)# interface GigabitEthernet0/0",
      "R2(config-if)# ip ospf 1 area 0",
      "R2(config-if)# interface GigabitEthernet0/1",
      "R2(config-if)# ip ospf 1 area 0",
      "R2(config-if)# ip ospf network point-to-point"
     ],
     "title": "OSPF enabled per interface",
     "note": "Per-interface enablement is explicit and easy to read. Setting a router-to-router Ethernet link to point-to-point skips DR/BDR election and speeds up adjacency."
    },
    {
     "type": "keypoints",
     "items": [
      "`passive-interface default` then `no passive-interface <uplink>` — safest on routers with many LAN interfaces.",
      "`ip ospf cost <n>` on an interface overrides the bandwidth-based cost.",
      "`ip ospf priority 0` keeps a router from ever becoming DR on that segment.",
      "Loopback interfaces are advertised as /32 host routes by default — ideal stable router IDs and management addresses."
     ],
     "title": "Options you will use often"
    },
    {
     "type": "callout",
     "kind": "insight",
     "title": "IPv6 uses OSPFv3",
     "text": "OSPFv3 carries IPv6 prefixes with the same ideas — areas, cost, DR/BDR and a 32-bit router ID. It is enabled per interface (for example `ipv6 ospf 1 area 0`) and forms neighbours over link-local addresses. A dual-stack network runs OSPFv2 and OSPFv3 side by side, or one OSPFv3 instance with IPv4 and IPv6 address families where the platform supports it."
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1# show ip ospf neighbor",
      "Neighbor ID     Pri   State           Dead Time   Address         Interface",
      "2.2.2.2           0   FULL/  -        00:00:36    10.0.12.2       GigabitEthernet0/1",
      "3.3.3.3           1   FULL/DR         00:00:33    10.0.13.2       GigabitEthernet0/2",
      "R1# show ip ospf interface brief",
      "Interface    PID   Area     IP Address/Mask    Cost  State Nbrs F/C",
      "Gi0/0        1     0        192.168.10.1/24    100   DR    0/0",
      "Gi0/1        1     0        10.0.12.1/30       100   P2P   1/1",
      "Gi0/2        1     0        10.0.13.1/30       100   BDR   1/1"
     ],
     "title": "Verifying neighbours and interfaces",
     "note": "FULL/- is a point-to-point neighbour (no DR). On Gi0/2, R3 is DR and R1 is BDR. Cost 100 for 1 Gbps confirms the 100 Gbps reference. The passive LAN shows 0 neighbours, as intended."
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1# show ip route ospf",
      "      10.0.0.0/8 is variably subnetted, 6 subnets, 3 masks",
      "O        10.2.20.0/24 [110/200] via 10.0.12.2, 00:04:10, GigabitEthernet0/1",
      "O        10.3.30.0/24 [110/200] via 10.0.13.2, 00:03:55, GigabitEthernet0/2",
      "R1# show ip protocols | include Router ID|Routing for|Passive",
      "  Router ID 1.1.1.1",
      "  Routing for Networks:",
      "  Passive Interface(s):"
     ],
     "title": "Verifying OSPF routes",
     "note": "Cost 200 = R1's outgoing 1 Gbps link (100) + R2's 1 Gbps LAN interface (100). `show ip protocols` confirms router ID, network statements and passive interfaces."
    },
    {
     "type": "topology",
     "title": "The single-area OSPF lab",
     "nodes": [
      {
       "id": "inet",
       "kind": "internet",
       "label": "Internet",
       "sub": "Static default on R1",
       "x": 3,
       "y": 0
      },
      {
       "id": "lan1",
       "kind": "switch",
       "label": "R1 LAN",
       "sub": "192.168.10.0/24",
       "x": 1,
       "y": 1
      },
      {
       "id": "r1",
       "kind": "router",
       "label": "R1",
       "sub": "RID 1.1.1.1",
       "x": 3,
       "y": 2
      },
      {
       "id": "r2",
       "kind": "router",
       "label": "R2",
       "sub": "RID 2.2.2.2",
       "x": 1,
       "y": 4
      },
      {
       "id": "r3",
       "kind": "router",
       "label": "R3",
       "sub": "RID 3.3.3.3",
       "x": 5,
       "y": 4
      },
      {
       "id": "lan2",
       "kind": "switch",
       "label": "R2 LAN",
       "sub": "10.2.20.0/24",
       "x": 1,
       "y": 6
      },
      {
       "id": "lan3",
       "kind": "switch",
       "label": "R3 LAN",
       "sub": "10.3.30.0/24",
       "x": 5,
       "y": 6
      }
     ],
     "links": [
      {
       "a": "r1",
       "b": "inet",
       "label": "default-information originate"
      },
      {
       "a": "r1",
       "b": "lan1",
       "label": "passive",
       "aEnd": "Gi0/0"
      },
      {
       "a": "r1",
       "b": "r2",
       "label": "P2P 10.0.12.0/30"
      },
      {
       "a": "r1",
       "b": "r3",
       "label": "DR/BDR 10.0.13.0/30"
      },
      {
       "a": "r2",
       "b": "lan2",
       "label": "passive"
      },
      {
       "a": "r3",
       "b": "lan3",
       "label": "passive"
      }
     ],
     "zones": [
      {
       "label": "OSPF area 0",
       "x": 0,
       "y": 1,
       "w": 7,
       "h": 6,
       "tone": "accent"
      }
     ],
     "caption": "Router-to-router links run OSPF; user LANs are passive, so they are advertised but hear no hellos. R1 originates the default route it holds as a static route toward the ISP, and both other routers learn it as O*E2."
    },
    {
     "type": "steps",
     "items": [
      {
       "title": "Interfaces",
       "text": "`show ip ospf interface brief` — every intended interface listed, in area 0, with the expected cost."
      },
      {
       "title": "Neighbours",
       "text": "`show ip ospf neighbor` — every expected neighbour FULL (or 2-WAY between DROTHERs)."
      },
      {
       "title": "Routes",
       "text": "`show ip route ospf` — every remote subnet present with sensible costs."
      },
      {
       "title": "Defaults",
       "text": "Branches show `O*E2 0.0.0.0/0` if a default is being originated."
      },
      {
       "title": "Data plane",
       "text": "Ping and trace from a user subnet to a remote subnet to prove the forwarding path."
      }
     ],
     "title": "A verification routine after any OSPF change"
    },
    {
     "type": "scenario",
     "situation": "R3's LAN is 10.3.30.0/25 on Gi0/0. R3 has `network 10.3.30.128 0.0.0.127 area 0`. Neighbours are FULL, but no other router learns 10.3.30.0/25.",
     "options": [
      {
       "text": "Make Gi0/0 passive",
       "feedback": "Passive interfaces are still advertised — but this one is not enabled at all.",
       "best": false
      },
      {
       "text": "Restart the OSPF process on every router",
       "feedback": "No restart fixes a statement that does not match the interface.",
       "best": false
      },
      {
       "text": "Raise the reference bandwidth on R3",
       "feedback": "Cost does not decide whether a prefix is advertised.",
       "best": false
      },
      {
       "text": "Fix the statement to `network 10.3.30.0 0.0.0.127 area 0` (or use `ip ospf 1 area 0` on Gi0/0)",
       "feedback": "Correct. The statement matches .128–.255, not the interface address in .0–.127, so Gi0/0 never joined OSPF.",
       "best": true
      }
     ],
     "title": "A subnet that will not advertise"
    },
    {
     "type": "case",
     "title": "Replacing static routes across three sites",
     "context": "A pharmaceutical distributor has its head office in Tejgaon, Dhaka and warehouses in Khulna and Rajshahi. Each pair of sites is linked by a provider point-to-point circuit, forming a triangle. Every router uses static routes. When the Dhaka–Khulna circuit failed last month, Khulna was cut off for six hours even though the Khulna–Rajshahi–Dhaka path was healthy. Only Dhaka has internet access.",
     "questions": [
      "Why did the static design fail to use the healthy path?",
      "Outline a single-area OSPF design for the three routers.",
      "How do the warehouses learn the way to the internet?"
     ],
     "answer": "Static routes pointed only at the Dhaka–Khulna circuit, and nothing recalculated a path when it failed. With **OSPF in area 0** on all three routers, the failure removes the link from every LSDB and SPF moves traffic over Khulna–Rajshahi–Dhaka within seconds. Design: manual **router IDs** on loopbacks (e.g. 1.1.1.1, 2.2.2.2, 3.3.3.3), WAN links set to **point-to-point** network type, **passive** LAN interfaces, a consistent **reference bandwidth** on all routers and, if one circuit is faster, costs that prefer it. Dhaka keeps its static default to the ISP and uses **`default-information originate`**, so both warehouses learn an OSPF default route that also fails over automatically."
    },
    {
     "type": "checklist",
     "title": "OSPF deployment and verification checklist",
     "items": [
      "Router ID set manually and unique on every router",
      "Same reference bandwidth configured on every router in the area",
      "Only intended interfaces enabled; wildcard masks double-checked",
      "User-facing LAN interfaces passive",
      "Router-to-router Ethernet links set to point-to-point where appropriate",
      "Hello/dead timers, area, subnet, MTU and authentication consistent on each link",
      "Every expected neighbour FULL (DROTHER pairs may be 2-WAY)",
      "Every remote subnet present in `show ip route ospf` with the expected cost",
      "Default route originated from the internet edge only",
      "Configuration saved; routing table snapshot stored for comparison"
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "Enable OSPF with `network` statements (wildcard masks) or per interface with `ip ospf <pid> area <id>`.",
      "Make user LANs passive and router-to-router Ethernet links point-to-point.",
      "`default-information originate` shares the edge router's default route with the area.",
      "Verify in order: interfaces, neighbours, routes, default, then data-plane tests.",
      "OSPFv3 applies the same design to IPv6."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the wildcard mask for the subnet 10.0.12.0/30?",
       "options": [
        "255.255.255.252",
        "0.0.0.4",
        "0.0.0.252",
        "0.0.0.3"
       ],
       "answer": 3,
       "explain": "255.255.255.255 − 255.255.255.252 = 0.0.0.3. The second is the subnet mask, 0.0.0.4 is the block size, and 0.0.0.252 inverts the wrong bits."
      },
      {
       "q": "What does `passive-interface GigabitEthernet0/0` do in OSPF?",
       "options": [
        "Removes Gi0/0's subnet from OSPF entirely",
        "Disables Gi0/0 so it shuts down",
        "Advertises Gi0/0's subnet but sends no hellos on it",
        "Makes Gi0/0 the DR on its segment"
       ],
       "answer": 2,
       "explain": "Passive interfaces stay in OSPF (their prefix is advertised) but form no neighbours. They are not removed, not shut down, and the DR role is unrelated."
      },
      {
       "q": "Branch routers need a default route learned via OSPF from the HQ router that has a static default. Which command on HQ achieves this?",
       "options": [
        "`redistribute connected`",
        "`default-information originate`",
        "`ip route 0.0.0.0 0.0.0.0 null0`",
        "`passive-interface default`"
       ],
       "answer": 1,
       "explain": "`default-information originate` injects the existing default into OSPF. Redistributing connected routes adds subnets not a default, a null0 default would discard traffic, and passive-interface stops hellos."
      },
      {
       "q": "`show ip ospf neighbor` shows `FULL/  -` for a neighbour. What does the dash mean?",
       "options": [
        "No DR/BDR role on a point-to-point link",
        "The neighbour is down",
        "The neighbour has not been assigned a router ID yet",
        "Authentication is disabled"
       ],
       "answer": 0,
       "explain": "On point-to-point network types there is no DR/BDR, so the role shows as a dash. FULL proves the neighbour is up, every router has an ID, and authentication is not shown here."
      },
      {
       "q": "Two routers both have `router ospf 1` and `router ospf 20`. Must process IDs match for adjacency?",
       "options": [
        "Yes, they must be identical",
        "Yes, but only on point-to-point links",
        "No, but both process IDs must be even numbers",
        "No, the process ID is locally significant"
       ],
       "answer": 3,
       "explain": "Process IDs only identify the OSPF instance inside one router. Area IDs must match, not process IDs, and there is no even-number rule."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l5",
   "title": "First-Hop Redundancy with VRRP-Style Gateways",
   "subtitle": "Keeping the default gateway alive when a router or switch fails",
   "minutes": 24,
   "objectives": [
    "Explain why hosts need a redundant default gateway",
    "Describe how a virtual IP, virtual MAC, master and backup work together",
    "Configure and verify a VRRP group with priority, preemption and tracking"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Hosts have exactly one default gateway address, usually set by DHCP. If the router or layer 3 switch holding that address fails, every host on the subnet is cut off — even if a second router sits right next to it. A **first-hop redundancy protocol (FHRP)** lets two or more routers share one **virtual gateway address**, so the hosts' setting never has to change."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "**Virtual Router Redundancy Protocol** version 3 is the open-standard FHRP for IPv4 and IPv6 (first published as RFC 5798 and updated by RFC 9568 in 2024). Routers in a VRRP group share a **virtual IP** and a **virtual MAC**. One router is **master** and answers for the virtual address; the others are **backups** that take over if the master's advertisements stop.",
     "title": "VRRP"
    },
    {
     "type": "flow",
     "items": [
      {
       "label": "Normal",
       "text": "R1 (priority 110) is master for 192.168.10.1; hosts send traffic to the virtual MAC."
      },
      {
       "label": "Failure",
       "text": "R1 loses power; its advertisements (every 1 s) stop."
      },
      {
       "label": "Detection",
       "text": "After the master-down interval (about 3 s), R2 (priority 100) becomes master."
      },
      {
       "label": "Announce",
       "text": "R2 sends gratuitous ARP for the virtual IP so switches relearn the virtual MAC on its port."
      },
      {
       "label": "Recovery",
       "text": "R1 returns; with preemption on, its higher priority makes it master again."
      }
     ],
     "title": "How a VRRP failover unfolds"
    },
    {
     "type": "topology",
     "title": "A VRRP gateway pair",
     "nodes": [
      {
       "id": "wan",
       "kind": "cloud",
       "label": "WAN / Internet",
       "x": 3,
       "y": 0
      },
      {
       "id": "r1",
       "kind": "router",
       "label": "R1 (master)",
       "sub": ".2 · priority 110",
       "x": 1.5,
       "y": 2
      },
      {
       "id": "vip",
       "kind": "router",
       "label": "Virtual router",
       "sub": "192.168.10.1",
       "x": 3,
       "y": 2
      },
      {
       "id": "r2",
       "kind": "router",
       "label": "R2 (backup)",
       "sub": ".3 · priority 100",
       "x": 4.5,
       "y": 2
      },
      {
       "id": "sw",
       "kind": "switch",
       "label": "SW1",
       "sub": "VLAN 10",
       "x": 3,
       "y": 3.5
      },
      {
       "id": "h",
       "kind": "host",
       "label": "Hosts",
       "sub": "Gateway 192.168.10.1",
       "x": 3,
       "y": 5
      }
     ],
     "links": [
      {
       "a": "r1",
       "b": "wan",
       "label": "tracked uplink",
       "aEnd": "Gi0/1"
      },
      {
       "a": "r2",
       "b": "wan"
      },
      {
       "a": "vip",
       "b": "r1",
       "style": "dashed"
      },
      {
       "a": "vip",
       "b": "r2",
       "style": "dashed"
      },
      {
       "a": "r1",
       "b": "sw"
      },
      {
       "a": "r2",
       "b": "sw"
      },
      {
       "a": "sw",
       "b": "h"
      }
     ],
     "caption": "Hosts only know the virtual address 192.168.10.1 and its virtual MAC (group 10 = 0x0A). R1 answers for it while it is master; if R1 or its tracked uplink fails, R2 takes over and no host setting changes."
    },
    {
     "type": "table",
     "head": [
      "Item",
      "Value"
     ],
     "rows": [
      [
       "Virtual MAC (IPv4)",
       "00-00-5E-00-01-XX, where XX is the group (VRID) in hex"
      ],
      [
       "Default priority",
       "100 (range 1–254 configurable; 255 = the router that owns the real address)"
      ],
      [
       "Election",
       "Highest priority wins; tie goes to the highest primary IP address"
      ],
      [
       "Preemption",
       "Enabled by default in VRRP"
      ],
      [
       "Advertisements",
       "Sent by the master to 224.0.0.18 (IP protocol 112), every 1 s by default"
      ],
      [
       "Roles",
       "One master, one or more backups per group"
      ]
     ],
     "title": "VRRP facts worth remembering"
    },
    {
     "type": "cli",
     "device": "R1 and R2 · IOS-style CLI",
     "lines": [
      "R1(config)# track 1 interface GigabitEthernet0/1 line-protocol",
      "R1(config)# interface GigabitEthernet0/0",
      "R1(config-if)# ip address 192.168.10.2 255.255.255.0",
      "R1(config-if)# vrrp 10 ip 192.168.10.1",
      "R1(config-if)# vrrp 10 priority 110",
      "R1(config-if)# vrrp 10 track 1 decrement 20",
      "R2(config)# interface GigabitEthernet0/0",
      "R2(config-if)# ip address 192.168.10.3 255.255.255.0",
      "R2(config-if)# vrrp 10 ip 192.168.10.1"
     ],
     "title": "Configuring VRRP on two gateways",
     "note": "Hosts use 192.168.10.1 as their gateway. If R1's uplink Gi0/1 goes down, tracking lowers R1 to 90, R2 (100) preempts and becomes master. Syntax varies between platforms and software versions; the concepts do not."
    },
    {
     "type": "cli",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "R1# show vrrp brief",
      "Interface          Grp Pri Time  Own Pre State   Master addr     Group addr",
      "Gi0/0              10  110 3570       Y  Master  192.168.10.2    192.168.10.1",
      "R2# show vrrp brief",
      "Interface          Grp Pri Time  Own Pre State   Master addr     Group addr",
      "Gi0/0              10  100 3609       Y  Backup  192.168.10.2    192.168.10.1"
     ],
     "title": "Verifying the group",
     "note": "Time is the master-down interval in milliseconds: three advertisement intervals plus a small skew that is shorter for higher priorities."
    },
    {
     "type": "compare",
     "columns": [
      {
       "title": "Single gateway",
       "items": [
        "Gateway failure isolates the whole subnet",
        "Engineers must re-address or reconfigure DHCP during an outage",
        "Second router sits idle",
        "Simple but fragile"
       ]
      },
      {
       "title": "VRRP group",
       "items": [
        "Virtual gateway survives a router failure in seconds",
        "Hosts and DHCP settings never change",
        "Load can be shared by running two groups with different masters",
        "Small extra configuration per VLAN"
       ]
      }
     ],
     "title": "Without and with first-hop redundancy"
    },
    {
     "type": "keypoints",
     "items": [
      "Make the VRRP master for a VLAN the **same switch that is STP root** for that VLAN, so layer 2 and layer 3 paths line up.",
      "Use **tracking** of uplinks so a router that has lost its way out hands over mastership.",
      "To share load, make R1 master for odd VLANs and R2 master for even VLANs.",
      "Keep the virtual IP consistent across sites (e.g. always `.1`) so documentation is predictable.",
      "Vendor-specific FHRPs work on the same idea; VRRP is the choice when devices come from different makers."
     ],
     "title": "Design tips"
    },
    {
     "type": "scenario",
     "situation": "R1 is VRRP master for VLAN 10. Its WAN uplink fails, but its LAN interface stays up, so R1 remains master. Users' traffic now goes to R1, which has to send everything across to R2 — or drops it if it has no route.",
     "options": [
      {
       "text": "Lower R2's priority so it never becomes master",
       "feedback": "That makes the problem worse; R2 is the router with a working uplink.",
       "best": false
      },
      {
       "text": "Configure interface or reachability tracking on R1 to decrement its priority below R2's when the uplink fails",
       "feedback": "Correct. With priority 110 − 20 = 90, R2 (100) preempts and hosts' gateway moves to the router that can still reach the network.",
       "best": true
      },
      {
       "text": "Disable preemption on both routers",
       "feedback": "Preemption is what allows R2 to take over based on priority; disabling it keeps R1 as master.",
       "best": false
      },
      {
       "text": "Change hosts' gateway to R2's real address",
       "feedback": "That bypasses redundancy and must be undone manually later.",
       "best": false
      }
     ],
     "title": "Master with no way out"
    },
    {
     "type": "reflection",
     "prompt": "Look at a network you know — your office, campus or home. List every single point of failure between a user's laptop and the internet (cables, switches, gateway, ISP). Which one would you fix first with what you learned in this module, and how?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Routing table",
       "def": "A router's list of destination prefixes with next hops, exit interfaces, AD and metric."
      },
      {
       "term": "Longest-prefix match",
       "def": "Rule that the most specific matching route (longest prefix) is used for forwarding."
      },
      {
       "term": "Administrative distance",
       "def": "Trust value used to choose between different route sources for the same prefix; lower wins."
      },
      {
       "term": "Metric",
       "def": "Value a routing protocol uses to compare paths; OSPF's metric is cost."
      },
      {
       "term": "Static route",
       "def": "Manually configured route that does not change unless an engineer changes it."
      },
      {
       "term": "Default route",
       "def": "0.0.0.0/0 or ::/0 — matches any destination not covered by a more specific route."
      },
      {
       "term": "Floating static route",
       "def": "Static route with a raised AD that is installed only when the preferred route disappears."
      },
      {
       "term": "OSPF",
       "def": "Open Shortest Path First — link-state interior routing protocol using cost and the SPF algorithm."
      },
      {
       "term": "Router ID",
       "def": "32-bit dotted-decimal value that uniquely identifies an OSPF router."
      },
      {
       "term": "DR / BDR",
       "def": "Designated and backup designated routers that reduce adjacencies on multi-access OSPF segments."
      },
      {
       "term": "Wildcard mask",
       "def": "Inverse mask used in OSPF network statements and ACLs; 0 = match, 1 = ignore."
      },
      {
       "term": "Passive interface",
       "def": "OSPF interface whose subnet is advertised but on which no hellos are sent."
      },
      {
       "term": "VRRP",
       "def": "Open-standard first-hop redundancy protocol that shares a virtual gateway IP between routers."
      }
     ]
    },
    {
     "type": "keypoints",
     "title": "Key takeaways",
     "items": [
      "An FHRP lets two or more routers share one virtual gateway IP and MAC, so hosts never need reconfiguring.",
      "VRRP: highest priority becomes master (default 100), preemption is on by default, advertisements go to 224.0.0.18.",
      "The IPv4 virtual MAC is 00-00-5E-00-01-XX with the group number in hex.",
      "Track uplinks so a master that has lost its way out hands over to the backup.",
      "Align the VRRP master with the STP root for each VLAN."
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What problem does a first-hop redundancy protocol solve?",
       "options": [
        "Routing loops between OSPF areas",
        "Duplex mismatches on access ports",
        "Hosts losing their only default gateway",
        "Broadcast storms caused by layer 2 loops"
       ],
       "answer": 2,
       "explain": "FHRPs keep the gateway address alive if one router fails. Routing loops, duplex problems and broadcast storms are handled by routing design, autonegotiation and STP."
      },
      {
       "q": "Two VRRP routers have priorities 120 and 100. Which becomes master?",
       "options": [
        "The router with priority 120",
        "The router with priority 100",
        "The router with the lower IP address",
        "Whichever router booted first"
       ],
       "answer": 0,
       "explain": "Highest priority wins in VRRP. IP address only breaks ties (highest wins), and boot order does not override priority while preemption is on."
      },
      {
       "q": "What is the virtual MAC address for VRRP group 10 (IPv4)?",
       "options": [
        "00-00-5E-00-01-10",
        "01-00-5E-00-00-12",
        "00-00-5E-00-01-0A",
        "FF-FF-FF-FF-FF-0A"
       ],
       "answer": 2,
       "explain": "The group number is written in hex in the last byte: 10 = 0x0A. 0x10 would be group 16, 01-00-5E… is an IPv4 multicast MAC, and FF-… is broadcast."
      },
      {
       "q": "Which address do hosts configure as their default gateway in a VRRP design?",
       "options": [
        "The master router's real interface IP",
        "The backup router's real interface IP",
        "The VRRP multicast address 224.0.0.18",
        "The shared virtual IP"
       ],
       "answer": 3,
       "explain": "Hosts point to the virtual IP so failover is invisible. Real addresses tie hosts to one router, and 224.0.0.18 is where VRRP advertisements go."
      },
      {
       "q": "Why track the uplink interface of a VRRP master?",
       "options": [
        "So it sends advertisements more often",
        "So it hands over mastership when it loses its way out",
        "So it can use a second virtual IP address",
        "So hosts receive a new DHCP lease automatically"
       ],
       "answer": 1,
       "explain": "Tracking lowers priority on uplink failure, letting a better-connected router preempt. It does not change timers, add virtual IPs or trigger DHCP renewals."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.exam.push([
 {
  "module": "m1",
  "q": "A 45 W PTZ camera is connected to a switch port that supplies 802.3at (PoE+). It boots but restarts whenever it pans and zooms. What should the engineer do?",
  "options": [
   "Hard-set the port to 100 Mbps full duplex",
   "Put the camera in its own voice VLAN",
   "Enable PortFast and BPDU guard on the port",
   "Move it to an 802.3bt port that can supply 60 W"
  ],
  "answer": 3,
  "explain": "PoE+ provides 30 W at the port, well below the camera's 45 W peak, so it browns out under load; an 802.3bt Type 3 port (60 W) fixes it. Speed/duplex, VLAN choice and spanning-tree features do not affect the power available."
 },
 {
  "module": "m1",
  "q": "A backup server's switch port shows `Gi1/0/9  connected  20  a-half  a-100` while the server NIC is hard-set to 100 Mbps full duplex. Backups are extremely slow. What is the best fix?",
  "options": [
   "Replace the server NIC with a faster 10 Gbps network card",
   "Move the server into a separate VLAN",
   "Set both ends to auto, or hard-set both identically",
   "Increase the switch MAC aging timer"
  ],
  "answer": 2,
  "explain": "The switch fell back to half duplex because the server does not negotiate, causing a duplex mismatch. Matching both ends removes the collisions. A faster NIC, a new VLAN or MAC aging changes leave the mismatch in place."
 },
 {
  "module": "m1",
  "q": "A new 10 Gbps fibre link between two floors will not come up. One end has a 10GBASE-SR optic and the other a 10GBASE-LR optic on OM4 multimode cable. What is the problem?",
  "options": [
   "The optics do not match each other or the cable",
   "OM4 cannot carry 10 Gbps over any distance",
   "The link needs PoE to power the optics",
   "Both fibre ends must be set to half duplex at 10 Gbps"
  ],
  "answer": 0,
  "explain": "SR (850 nm, multimode) and LR (1310 nm, single-mode) are different standards; both ends must use the same type, matched to the fibre. OM4 supports 10 Gbps short-reach, optics are powered by the switch, and 10G Ethernet is full duplex only."
 },
 {
  "module": "m1",
  "q": "A capture on a web server shows a packet from client 10.40.1.20, but the frame's source MAC belongs to the server's own gateway router. Why?",
  "options": [
   "The client is spoofing the router's MAC address",
   "Routers build a new frame with their own MAC on each hop",
   "NAT has replaced the client's MAC address",
   "The access switch rewrote the source MAC to save MAC table space"
  ],
  "answer": 1,
  "explain": "Layer 2 headers are rebuilt at every router, so the last router's MAC appears as the source while IP addresses stay end to end. This is normal, not spoofing; NAT changes IP addresses, not MACs; and switches do not rewrite source MACs."
 },
 {
  "module": "m1",
  "q": "A developer is building an app that sends a small sensor reading every second. Occasional loss is acceptable, but overhead must be minimal. Which transport fits best?",
  "options": [
   "TCP with a large receive window",
   "TCP with keepalives enabled",
   "UDP",
   "ICMP echo requests"
  ],
  "answer": 2,
  "explain": "UDP's 8-byte header and lack of connection set-up suit frequent small messages where retransmission is not needed. TCP options add reliability and overhead the app does not need, and ICMP is not an application transport."
 },
 {
  "module": "m1",
  "q": "Security policy says switches must be managed only over an encrypted CLI. Which rule should the management firewall allow?",
  "options": [
   "TCP 23 to the switch management addresses",
   "UDP 161 to the switch management addresses",
   "TCP 80 to the switch management addresses",
   "TCP 22 to the switch management addresses"
  ],
  "answer": 3,
  "explain": "SSH (TCP 22) provides an encrypted CLI. Telnet (23) is clear text, SNMP (UDP 161) is a monitoring protocol, and HTTP (80) is unencrypted web access."
 },
 {
  "module": "m1",
  "q": "A university with eight buildings and 4,000 users wants a campus design where adding a building does not change the existing backbone. Which design fits?",
  "options": [
   "Two-tier collapsed core in the main building",
   "Three-tier: access, distribution per building, and a core",
   "A single large switch stack for the campus",
   "Daisy-chained access switches between buildings"
  ],
  "answer": 1,
  "explain": "A separate core joins per-building distribution blocks, so new buildings plug in as new blocks. A collapsed core suits one building, one stack is a single point of failure, and daisy-chains make buildings depend on each other."
 },
 {
  "module": "m1",
  "q": "A Linux PC cannot reach anything. `ip -br addr` shows `eth0  DOWN` and the switch shows the port as `notconnect`. What should be checked first?",
  "options": [
   "The cable, wall jack and patch-panel connection",
   "The DNS server configured on the PC",
   "The default route on the core router",
   "The OSPF neighbour states on the head-office WAN routers"
  ],
  "answer": 0,
  "explain": "A down link on both ends is a Layer 1 problem, so start with the physical path. DNS, core routing and OSPF only matter once the link is up."
 },
 {
  "module": "m2",
  "q": "A host is configured as `10.10.5.130/25` with gateway `10.10.5.1`. It reaches local hosts but nothing remote. What is wrong?",
  "options": [
   "The host is using the subnet's broadcast address",
   "A /25 mask cannot be used on a host",
   "The host needs a public IP address to route",
   "The gateway is outside the host's subnet"
  ],
  "answer": 3,
  "explain": "10.10.5.130/25 is in 10.10.5.128 – 10.10.5.255, so 10.10.5.1 is not on-link; the gateway must be inside that range (e.g. 10.10.5.129). .130 is a normal host, /25 is valid, and private addresses route internally."
 },
 {
  "module": "m2",
  "q": "A new VLAN must hold 120 devices and the address space is tight. Which prefix should be used?",
  "options": [
   "/25",
   "/24",
   "/26",
   "/27"
  ],
  "answer": 0,
  "explain": "A /25 provides 126 usable hosts, the smallest that fits 120. A /24 wastes 128 addresses, while /26 (62) and /27 (30) are too small."
 },
 {
  "module": "m2",
  "q": "192.168.100.0/25 is already allocated to Lab A. The next segment needs 50 hosts. Which subnet should it get?",
  "options": [
   "192.168.100.64/26",
   "192.168.100.128/26",
   "192.168.100.100/26",
   "192.168.100.128/25"
  ],
  "answer": 1,
  "explain": "The /25 uses .0 – .127, so the next free /26 starts at .128. .64/26 overlaps Lab A, .100 is not a /26 boundary, and a /25 is larger than needed."
 },
 {
  "module": "m2",
  "q": "On-premises networks use 192.168.0.0/16. A team proposes 192.168.0.0/16 for a new cloud network that will be connected by VPN. What should you recommend?",
  "options": [
   "Keep the same block so firewall rules can be reused",
   "Use 169.254.0.0/16 so the cloud is isolated",
   "Use a non-overlapping block such as 10.200.0.0/16",
   "Use 203.0.113.0/24 because it is never routed"
  ],
  "answer": 2,
  "explain": "Overlapping ranges make routing across the VPN ambiguous. Reusing rules is not worth broken routing, link-local space is not routable, and documentation space must not be used in production."
 },
 {
  "module": "m2",
  "q": "Which is a correct compressed form of `2001:0db8:0000:0000:0000:ff00:0042:8329`?",
  "options": [
   "2001:db8:0:0::ff00:0042:8329:0",
   "2001:db8::ff:42:8329",
   "2001:db8::ff00:42:8329",
   "2001:db8:::ff00:42:8329"
  ],
  "answer": 2,
  "explain": "Drop leading zeros and replace the run of three zero hextets with ::. The first adds a hextet, the second wrongly shortens ff00 (only leading zeros may be removed), and ::: is invalid."
 },
 {
  "module": "m2",
  "q": "Hosts on an IPv6 VLAN form global addresses with SLAAC but have no DNS server. The router sends RAs with only the A flag set. What is the best fix?",
  "options": [
   "Set the O flag and provide stateless DHCPv6 for DNS",
   "Set the M flag and remove the prefix information from the RA",
   "Change the VLAN prefix from /64 to /56",
   "Disable SLAAC and configure static IPv4 DNS"
  ],
  "answer": 0,
  "explain": "The O flag tells hosts to get other settings such as DNS from DHCPv6 while keeping SLAAC addresses (RDNSS in the RA is another option). The M-flag change rebuilds addressing unnecessarily, /56 breaks SLAAC, and IPv4 DNS settings do not configure IPv6 clients."
 },
 {
  "module": "m2",
  "q": "A router interface has MAC `0c1d.34aa.bbcc` and the command `ipv6 address 2001:db8:5:1::/64 eui-64`. What address does it get?",
  "options": [
   "2001:db8:5:1:c1d:34ff:feaa:bbcc",
   "2001:db8:5:1:e1d:34fe:ffaa:bbcc",
   "2001:db8:5:1:c1d:34aa:fffe:bbcc",
   "2001:db8:5:1:e1d:34ff:feaa:bbcc"
  ],
  "answer": 3,
  "explain": "Insert FFFE in the middle (0c1d:34ff:feaa:bbcc) and flip the 7th bit: 0c becomes 0e. The second option skips the flip, the third reverses FFFE, and the fourth inserts it in the wrong place."
 },
 {
  "module": "m2",
  "q": "What is the broadcast address of the subnet that contains 10.44.77.200/21?",
  "options": [
   "10.44.77.255",
   "10.44.79.255",
   "10.44.71.255",
   "10.44.80.255"
  ],
  "answer": 1,
  "explain": "/21 gives a block of 8 in the third octet: 77 sits in 72 – 79, so the subnet is 10.44.72.0 and the broadcast 10.44.79.255. .77.255 treats it as /24, .71.255 is the previous subnet's broadcast, and .80.255 is in the next subnet."
 },
 {
  "module": "m3",
  "q": "SW1 logs a native VLAN mismatch on its trunk to SW2. `show interfaces trunk` shows native VLAN 1 on SW1 and 99 on SW2. Some untagged management traffic appears in the wrong VLAN. What should you do?",
  "options": [
   "Remove VLAN 99 from the allowed list on SW2",
   "Convert the trunk to an access port in VLAN 1",
   "Enable PortFast on both trunk ports",
   "Set the same unused native VLAN on both ends"
  ],
  "answer": 3,
  "explain": "The native VLAN must match so untagged frames stay in one VLAN. Removing VLAN 99 or converting to access breaks the multi-VLAN link, and PortFast does not belong on trunks between switches."
 },
 {
  "module": "m3",
  "q": "PCs in VLAN 20 cannot reach their gateway 10.10.20.1. The router shows `interface Gi0/0.20`, `encapsulation dot1Q 30`, `ip address 10.10.20.1 255.255.255.0`. What is the fault?",
  "options": [
   "Subinterface numbers must start at 100",
   "The gateway must use the last usable address",
   "The subinterface is tagged for VLAN 30, not VLAN 20",
   "Router-on-a-stick cannot route VLAN 20"
  ],
  "answer": 2,
  "explain": "The dot1Q VLAN ID decides which VLAN a subinterface serves; it must be 20. Subinterface numbers are labels, gateways can be any usable address, and router-on-a-stick supports any VLAN ID."
 },
 {
  "module": "m3",
  "q": "SW1 is root for VLAN 10. SW2 and SW3 each have a direct 1 Gbps link to SW1 and a 1 Gbps link to each other. All priorities are 32768; SW2's MAC is lower than SW3's. Which port is blocked?",
  "options": [
   "SW3's port toward SW2",
   "SW2's port toward SW3",
   "SW2's port toward SW1",
   "SW3's port toward SW1"
  ],
  "answer": 0,
  "explain": "Both have equal cost to the root on the SW2–SW3 link, so the tie goes to the lower bridge ID: SW2's port becomes designated and SW3's becomes alternate (blocked). Ports toward the root are root ports and forward."
 },
 {
  "module": "m3",
  "q": "A student connects a patch cable between two wall ports in a lab. The VLAN floods with traffic and MAC addresses flap between ports. Which feature on edge ports would have stopped this?",
  "options": [
   "LLDP on every access port",
   "BPDU guard with PortFast",
   "A higher MAC aging timer",
   "LACP active mode on access ports"
  ],
  "answer": 1,
  "explain": "With BPDU guard, an edge port that receives the looped BPDU is err-disabled, breaking the loop. LLDP only reports neighbours, MAC aging does not stop loops, and LACP builds bundles between switches."
 },
 {
  "module": "m3",
  "q": "An EtherChannel will not form. SW1 members use `channel-group 1 mode on` and SW2 members use `channel-group 1 mode active`. What is the fix?",
  "options": [
   "Change SW2 to `mode passive`",
   "Add more member links to SW2",
   "Set SW1's native VLAN to 1",
   "Run LACP on both ends"
  ],
  "answer": 3,
  "explain": "Static `on` sends no LACP, so it cannot pair with an LACP side; both must run LACP (active/active or active/passive) or both be static. Passive still requires LACP from the other end, extra links do not help, and native VLAN is unrelated."
 },
 {
  "module": "m3",
  "q": "You search an access switch for a laptop's MAC and find it on Gi1/0/48, which is the uplink to the distribution switch. What should you do next?",
  "options": [
   "Shut down Gi1/0/48 to isolate the laptop",
   "Clear the whole MAC table and wait",
   "Follow the uplink to the next switch and repeat the search",
   "Assume the laptop is plugged directly into port Gi1/0/48 itself"
  ],
  "answer": 2,
  "explain": "An uplink port means the laptop is further along; use LLDP to identify the neighbour and search its table. Shutting the uplink cuts off many users, clearing tables only delays you, and a trunk is not the laptop's access port."
 },
 {
  "module": "m3",
  "q": "A PC on Gi1/0/7 receives an address from the wrong subnet. `show vlan brief` lists Gi1/0/7 under VLAN 1, while the plan says VLAN 10. What fixes it?",
  "options": [
   "`switchport access vlan 10` on Gi1/0/7",
   "`switchport trunk native vlan 10` on Gi1/0/7",
   "`spanning-tree portfast` on Gi1/0/7",
   "`no switchport` on Gi1/0/7"
  ],
  "answer": 0,
  "explain": "The port is in the default VLAN; assigning it to VLAN 10 puts the PC in the right subnet. Native VLAN settings apply to trunks, PortFast only speeds up forwarding, and `no switchport` turns it into a routed port."
 },
 {
  "module": "m4",
  "q": "R1 has `0.0.0.0/0 via A`, `10.0.0.0/8 via B`, `10.20.0.0/16 via C` and `10.20.30.0/24 via D`. Where does a packet to 10.20.31.5 go?",
  "options": [
   "Via D",
   "Via C",
   "Via B",
   "Via A"
  ],
  "answer": 1,
  "explain": "10.20.31.5 is outside 10.20.30.0/24 but inside 10.20.0.0/16, the longest matching prefix. D's /24 does not contain it, and B's /8 and the default are shorter matches."
 },
 {
  "module": "m4",
  "q": "An engineer adds `ip route 10.50.0.0 255.255.0.0 10.0.12.9 120` while OSPF already provides 10.50.0.0/16. Which route is installed?",
  "options": [
   "The static route, because static routes always win over OSPF",
   "Both, with equal-cost load sharing",
   "Neither, until one of them is removed",
   "The OSPF route, because 110 is lower than 120"
  ],
  "answer": 3,
  "explain": "For the same prefix, the lower AD wins; the static's AD was raised to 120, so it floats behind OSPF (110). Statics win only with their default AD of 1, routes from different sources do not load-share, and conflicts are resolved by AD."
 },
 {
  "module": "m4",
  "q": "A branch has a primary static default to ISP-1 and a floating static (AD 10) to ISP-2. ISP-1's network fails beyond its modem, but the router's link to the modem stays up. Traffic is lost. Why?",
  "options": [
   "The floating route needs an AD lower than 1",
   "Floating static routes only work for IPv6",
   "Its interface stays up, so the primary route stays",
   "The branch needs a separate /32 host route for every website"
  ],
  "answer": 2,
  "explain": "Static routes are only removed when the exit interface or next hop is lost locally; reachability tracking is needed to detect remote failure. An AD below 1 is impossible for statics, floating statics work for IPv4, and per-site host routes are not a design."
 },
 {
  "module": "m4",
  "q": "Two OSPF routers on a link stay in `EXSTART/EXCHANGE`. Hellos, area and subnet match. One interface has `mtu 1400`. What is the fix?",
  "options": [
   "Make the interface MTU match on both routers",
   "Change one router's OSPF process ID",
   "Set both interface priorities to 0",
   "Raise the reference bandwidth on both routers"
  ],
  "answer": 0,
  "explain": "MTU mismatches stall the database exchange. Process IDs are local, priority 0 only affects DR election, and reference bandwidth changes costs, not adjacency."
 },
 {
  "module": "m4",
  "q": "On one Ethernet segment, R1 (priority 1, RID 1.1.1.1), R2 (priority 10, RID 2.2.2.2) and R3 (priority 0, RID 9.9.9.9) elect a DR. Later R4 joins with priority 50. Which router is DR after R4 joins?",
  "options": [
   "R4",
   "R2",
   "R3",
   "R1"
  ],
  "answer": 1,
  "explain": "R2 wins the original election on priority. DR election is not pre-emptive, so R4 does not take over when it joins. R3 can never be DR with priority 0, and R1 has the lowest non-zero priority."
 },
 {
  "module": "m4",
  "q": "After an engineer adds `passive-interface default` under `router ospf 1` on R2, all of R2's neighbours disappear. What else was needed?",
  "options": [
   "`default-information originate` on R2",
   "A new router ID on R2",
   "`ip ospf priority 0` on R2's uplinks",
   "`no passive-interface` on R2's uplink interfaces"
  ],
  "answer": 3,
  "explain": "Passive-interface default stops hellos everywhere; uplinks must be re-enabled with `no passive-interface`. Originating a default, a new router ID or priority 0 do not restore hellos."
 },
 {
  "module": "m4",
  "q": "Both VRRP routers for VLAN 10 show `State Master` in `show vrrp brief`, and hosts report intermittent gateway problems. What is the most likely cause?",
  "options": [
   "Both routers are using the default priority of 100",
   "They cannot hear each other's VRRP advertisements",
   "Preemption is enabled on both routers",
   "The virtual IP is the first address in the subnet"
  ],
  "answer": 1,
  "explain": "Two masters means advertisements to 224.0.0.18 are not getting through (for example a VLAN or filtering problem between them). Equal priorities are resolved by IP address, preemption is normal, and .1 is a common virtual IP."
 }
]);
