import { useState, useMemo } from "react"

interface Section {
  title: string
  content: string[]
}

// Оригинальные секции с базовыми номерами интерфейсов (будем заменять "ens{BASE}" на актуальные)
const originalSections: Section[] = [
  {
    title: "СХЕМА СЕТИ",
    content: [
      "ISP (172.16.1.14/28, 172.16.2.14/28)",
      "    |",
      "HQ-RTR (172.16.1.1/28) -- HQ-SRV (192.168.1.2/27)",
      "    |-- VLAN10: 192.168.1.1/27 (управление)",
      "    |-- VLAN20: 192.168.2.1/28 (DHCP)",
      "    |-- VLAN99: 192.168.3.1/29 (управление)",
      "    |",
      "BR-RTR (172.16.2.1/28) -- BR-SRV (192.168.4.2/28)"
    ]
  },
  {
    title: "1. НАСТРОЙКА ISP",
    content: [
      "# Устанавливаем hostname",
      "hostnamectl set-hostname isp; exec bash",
      "",
      "# Включаем IP forward",
      "vim /etc/net/sysctl.conf",
      "# Изменить: net.ipv4.ip_forward = 0 на net.ipv4.ip_forward = 1",
      "",
      "# Настраиваем интерфейсы",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE+1}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE+1}/options",
      "echo '172.16.1.14/28' > /etc/net/ifaces/ens{BASE+1}/ipv4address",
      "",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE+2}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE+2}/options",
      "echo '172.16.2.14/28' > /etc/net/ifaces/ens{BASE+2}/ipv4address",
      "",
      "# Перезапускаем сеть",
      "systemctl restart network",
      "",
      "# Обновляем и устанавливаем пакеты",
      "apt-get update",
      "apt-get install nano nftables -y",
      "",
      "# Настраиваем nftables",
      "vim /etc/nftables/nftables.nft",
      "# ДОБАВИТЬ:",
      "table inet nat {",
      "    chain postrouting {",
      "        type nat hook postrouting priority srcnat;",
      "        oifname \"ens{BASE}\" masquerade",
      "    }",
      "}",
      "",
      "systemctl enable --now nftables",
      "systemctl status nftables"
    ]
  },
  {
    title: "2. НАСТРОЙКА HQ-RTR",
    content: [
      "# Устанавливаем hostname",
      "hostnamectl set-hostname hq-rtr; exec bash",
      "",
      "# Включаем IP forward",
      "vim /etc/net/sysctl.conf",
      "# Изменить: net.ipv4.ip_forward = 0 на net.ipv4.ip_forward = 1",
      "",
      "# Добавляем DNS",
      "echo 'nameserver 8.8.8.8' >> /etc/resolv.conf",
      "",
      "# Настраиваем интерфейсы",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE}/options",
      "echo '172.16.1.1/28' > /etc/net/ifaces/ens{BASE}/ipv4address",
      "echo 'default via 172.16.1.14' > /etc/net/ifaces/ens{BASE}/ipv4route",
      "",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE+1}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE+1}/options",
      "echo '192.168.1.1/27' > /etc/net/ifaces/ens{BASE+1}/ipv4address",
      "",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE+2}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE+2}/options",
      "echo '192.168.2.1/28' > /etc/net/ifaces/ens{BASE+2}/ipv4address",
      "",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE+3}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE+3}/options",
      "echo '192.168.3.1/29' > /etc/net/ifaces/ens{BASE+3}/ipv4address",
      "",
      "# Перезапускаем сеть",
      "systemctl restart network",
      "",
      "# Проверяем интернет",
      "apt-get update",
      "",
      "# Устанавливаем пакеты",
      "apt-get install nano nftables sudo dhcp-server NetworkManager-ovs frr -y",
      "",
      "# Настраиваем nftables",
      "vim /etc/nftables/nftables.nft",
      "# ДОБАВИТЬ:",
      "table inet nat {",
      "    chain postrouting {",
      "        type nat hook postrouting priority srcnat;",
      "        oifname \"ens{BASE}\" masquerade",
      "    }",
      "}",
      "",
      "systemctl enable --now nftables",
      "systemctl status nftables"
    ]
  },
  {
    title: "3. НАСТРОЙКА BR-RTR",
    content: [
      "# Устанавливаем hostname",
      "hostnamectl set-hostname br-rtr; exec bash",
      "",
      "# Включаем IP forward",
      "vim /etc/net/sysctl.conf",
      "# Изменить: net.ipv4.ip_forward = 0 на net.ipv4.ip_forward = 1",
      "",
      "# Добавляем DNS",
      "echo 'nameserver 8.8.8.8' >> /etc/resolv.conf",
      "",
      "# Настраиваем интерфейсы",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE}/options",
      "echo '172.16.2.1/28' > /etc/net/ifaces/ens{BASE}/ipv4address",
      "echo 'default via 172.16.2.14' > /etc/net/ifaces/ens{BASE}/ipv4route",
      "",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE+1}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE+1}/options",
      "echo '192.168.4.1/28' > /etc/net/ifaces/ens{BASE+1}/ipv4address",
      "",
      "# Перезапускаем сеть",
      "systemctl restart network",
      "",
      "# Проверяем интернет",
      "apt-get update",
      "",
      "# Устанавливаем пакеты",
      "apt-get install nano nftables sudo frr -y",
      "",
      "# Настраиваем nftables",
      "vim /etc/nftables/nftables.nft",
      "# ДОБАВИТЬ:",
      "table inet nat {",
      "    chain postrouting {",
      "        type nat hook postrouting priority srcnat;",
      "        oifname \"ens{BASE}\" masquerade",
      "    }",
      "}",
      "",
      "systemctl enable --now nftables",
      "systemctl status nftables"
    ]
  },
  {
    title: "4. НАСТРОЙКА HQ-SRV",
    content: [
      "# Устанавливаем hostname",
      "hostnamectl set-hostname hq-srv; exec bash",
      "",
      "# Включаем IP forward",
      "vim /etc/net/sysctl.conf",
      "# Изменить: net.ipv4.ip_forward = 0 на net.ipv4.ip_forward = 1",
      "",
      "# Добавляем DNS",
      "echo 'nameserver 8.8.8.8' >> /etc/resolv.conf",
      "",
      "# Настраиваем интерфейсы",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE}/options",
      "echo '192.168.1.2/27' > /etc/net/ifaces/ens{BASE}/ipv4address",
      "echo 'default via 192.168.1.1' > /etc/net/ifaces/ens{BASE}/ipv4route",
      "",
      "# Перезапускаем сеть",
      "systemctl restart network",
      "",
      "# Проверяем интернет",
      "apt-get update",
      "",
      "# Устанавливаем пакеты",
      "apt-get install nano bind -y"
    ]
  },
  {
    title: "5. НАСТРОЙКА BR-SRV",
    content: [
      "# Устанавливаем hostname",
      "hostnamectl set-hostname br-srv; exec bash",
      "",
      "# Включаем IP forward",
      "vim /etc/net/sysctl.conf",
      "# Изменить: net.ipv4.ip_forward = 0 на net.ipv4.ip_forward = 1",
      "",
      "# Добавляем DNS",
      "echo 'nameserver 8.8.8.8' >> /etc/resolv.conf",
      "",
      "# Настраиваем интерфейсы",
      "cp /etc/net/ifaces/default/options /etc/net/ifaces/ens{BASE}/",
      "echo 'TYPE=eth' >> /etc/net/ifaces/ens{BASE}/options",
      "echo '192.168.4.2/28' > /etc/net/ifaces/ens{BASE}/ipv4address",
      "echo 'default via 192.168.4.1' > /etc/net/ifaces/ens{BASE}/ipv4route",
      "",
      "# Перезапускаем сеть",
      "systemctl restart network",
      "",
      "# Проверяем интернет",
      "apt-get update",
      "",
      "# Устанавливаем пакеты",
      "apt-get install nano -y"
    ]
  },
  {
    title: "6. НАСТРОЙКА HQ-CLI",
    content: [
      "# Устанавливаем hostname",
      "hostnamectl set-hostname hq-cli.aks42.aks; exec bash",
      "",
      "# Включаем IP forward",
      "vim /etc/net/sysctl.conf",
      "# Изменить: net.ipv4.ip_forward = 0 на net.ipv4.ip_forward = 1",
      "",
      "# Настраиваем время",
      "timedatectl set-timezone Europe/Moscow",
      "timedatectl"
    ]
  }
]

export function ExamPage({ isDark }: { isDark: boolean }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [baseNumber, setBaseNumber] = useState<string>("19")

  // Преобразуем секции с учетом выбранного базового номера
  const sections = useMemo(() => {
    const baseNum = parseInt(baseNumber) || 19 // Если не число или пусто, используем 19
    
    return originalSections.map(section => {
      // Для схемы сети не нужно менять контент
      if (section.title === "СХЕМА СЕТИ") {
        return section
      }
      
      // Для остальных разделов заменяем {BASE}, {BASE+1} и т.д.
      const updatedContent = section.content.map(line => {
        return line
          .replace(/ens\{BASE\+3\}/g, `ens${baseNum + 3}`)
          .replace(/ens\{BASE\+2\}/g, `ens${baseNum + 2}`)
          .replace(/ens\{BASE\+1\}/g, `ens${baseNum + 1}`)
          .replace(/ens\{BASE\}/g, `ens${baseNum}`)
      })
      
      return {
        ...section,
        content: updatedContent
      }
    })
  }, [baseNumber])

  const filteredSections = useMemo(() => {
    return sections.filter(section =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.some(line => line.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [sections, searchQuery])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Можно добавить уведомление об успешном копировании
    })
  }

  const isCommand = (line: string) => {
    return line.trim() !== "" && 
           !line.trim().startsWith("#") && 
           !line.includes("ДОБАВИТЬ") &&
           !line.includes("Изменить:")
  }

  const handleBaseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Разрешаем только цифры и пустую строку
    if (/^\d*$/.test(value)) {
      setBaseNumber(value)
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-slate-900"} transition-colors`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 flex-1 flex flex-col min-h-0 w-full">
        {/* Заголовок и поиск */}
        <div className="mb-2 sm:mb-3 flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between flex-shrink-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Методичка по настройке сети</h1>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <label 
                htmlFor="baseNumber" 
                className={`text-xs whitespace-nowrap ${isDark ? "text-zinc-300" : "text-slate-600"}`}
              >
                Начало ens:
              </label>
              <input
                id="baseNumber"
                type="text"
                placeholder="19"
                value={baseNumber}
                onChange={handleBaseNumberChange}
                className={`px-2 py-1 rounded-lg border text-sm ${
                  isDark 
                    ? "bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400" 
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 w-16`}
              />
            </div>
            
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg border text-sm ${
                isDark 
                  ? "bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400" 
                  : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48 md:w-64`}
            />
          </div>
        </div>

        {/* Компактный контейнер для методички */}
        <div 
          className={`flex-1 min-h-0 flex flex-col ${
            isDark ? "bg-zinc-800 border-zinc-700" : "bg-slate-50 border-slate-200"
          } border rounded-lg shadow-lg overflow-hidden`}
        >
          <div className="overflow-y-auto flex-1 p-2 sm:p-3 md:p-4 min-h-0">
            {filteredSections.length === 0 ? (
              <div className="text-center py-8 text-zinc-400">
                Ничего не найдено
              </div>
            ) : (
              filteredSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-4 sm:mb-6 last:mb-0">
                  {/* Заголовок секции */}
                  <h2 
                    className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 pb-1 border-b ${
                      isDark ? "border-zinc-700 text-blue-400" : "border-slate-300 text-blue-600"
                    }`}
                  >
                    {section.title}
                  </h2>

                  {/* Команды */}
                  <div 
                    className={`${
                      isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-slate-200"
                    } border rounded-lg p-2 sm:p-3 md:p-4 font-mono text-[10px] sm:text-xs md:text-sm leading-relaxed`}
                  >
                    {section.content.map((line, lineIndex) => {
                      if (line.trim() === "") {
                        return <div key={lineIndex} className="h-2" />
                      }

                      const isCmd = isCommand(line)
                      const isComment = line.trim().startsWith("#")
                      const isConfigBlock = line.includes("{") || line.includes("}") || line.trim() === "}"

                      return (
                        <div
                          key={lineIndex}
                          className={`mb-1 flex items-start group ${
                            isCmd ? "cursor-pointer hover:opacity-80" : ""
                          }`}
                          onClick={() => isCmd && copyToClipboard(line.trim())}
                          title={isCmd ? "Кликните чтобы скопировать" : ""}
                        >
                          <span 
                            className={`${
                              isDark 
                                ? isComment 
                                  ? "text-zinc-400" 
                                  : isConfigBlock
                                    ? "text-purple-300"
                                    : isCmd
                                      ? "text-green-400"
                                      : "text-zinc-300"
                                : isComment
                                  ? "text-slate-500"
                                  : isConfigBlock
                                    ? "text-purple-600"
                                    : isCmd
                                      ? "text-green-600"
                                      : "text-slate-700"
                            } select-all ${isCmd ? "hover:text-green-300" : ""}`}
                          >
                            {line}
                          </span>
                          {isCmd && (
                            <span className={`ml-2 text-xs opacity-0 group-hover:opacity-100 ${
                              isDark ? "text-zinc-500" : "text-slate-400"
                            }`}>
                              [скопировать]
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
