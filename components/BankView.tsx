import React, { useState, useEffect } from 'react';
import { Account } from '../types';
import { SectionHeader, Button, Card, GuideBox } from './Shared';
import { copyToClipboard } from '../utils/parser';

const STATIC_ACCOUNTS: Account[] = [
    {u: "michael.mcgoldrick78@gmail.com", p: "QuantumLeap13%"},
    {u: "marceljoosten93@gmail.com", p: "MJoosten93."},
    {u: "pmitchel@verizon.net", p: "Beth1123!"},
    {u: "lnoeding@gmail.com", p: "Coco1959!"},
    {u: "cshaposka@gmail.com", p: "Aiden214!"},
    {u: "aberlanga831@gmail.com", p: "Dalla$15"},
    {u: "aaron.vanvynckt@yahoo.com", p: "420Money$"},
    {u: "jeremy@jth1.com", p: "H1lfiger1!"},
    {u: "mika-mico@hotmail.com", p: "lamer123A!"},
    {u: "kennedy.brns@gmail.com", p: "Bentley123!"},
    {u: "lisa.em@outlook.de", p: "Ipodtouch1!"},
    {u: "annamfrost@mac.com", p: "Derfor01"},
    {u: "mdieterk@gmail.com", p: "Mandc1876"},
    {u: "jglosser27@gmail.com", p: "Arizong27!"},
    {u: "rabunali1@icloud.com", p: "Pizzaservice1!"},
    {u: "robert.iadanza@gmail.com", p: "N0t4U2c!"},
    {u: "nishant.dey.purkayastha@gmail.com", p: "Edmundian@1988"},
    {u: "aquill.page@yahoo.com", p: "page91Bravo!"},
    {u: "dbsrlgh007@naver.com", p: "Gmfrqor4167!"},
    {u: "andrew.saffin@gmail.com", p: "Iggypop2"},
    {u: "jkdpfs62@hotmail.com", p: "Soulmate2017$"},
    {u: "wm5382@gmail.com", p: "$WMtcm039606"},
    {u: "m41vmnt@bomnet.net", p: "EO5R4FBU2QTUYTVKK8WCTBD"},
    {u: "liz50shauu@meocon.org", p: "ET2DMXF4JTOI5NNZIRK4BDW"},
    {u: "jesserussell45@gmail.com", p: "45Bigtoe!"},
    {u: "victorwz@126.com", p: "19760726-wz"},
    {u: "mangdazfju@okiae.com", p: "ECCHXFK5RDY6O4FUFHK2KN8"},
    {u: "wjgrayson1118@gmail.com", p: "$Wgr8ys0n"},
    {u: "rwarffuel@gmail.com", p: "@warffuel0"},
    {u: "bhulsern@gmail.com", p: "Nurse710*"},
    {u: "marya.moshfegh@gmail.com", p: "@Moshma270683"},
    {u: "joshnick00@gmail.com", p: "Jmatthew1282$"},
    {u: "STUART.QUINTAL@gmail.com", p: "Cher0k31@"},
    {u: "bird4626@gmail.com", p: "jo890217@0217"},
    {u: "petreig@hotmail.com", p: "Piccolino1!"},
    {u: "mikwors@sky.com", p: "Raider11!"},
    {u: "jbutcher2016@gmail.com", p: "Greenhoop1!"},
    {u: "hajri_sg@hotmail.com", p: "19891663sg55"},
    {u: "radiolouis@gmail.com", p: "Drocourt62!"},
    {u: "binnybaker@me.com", p: "walker133"},
    {u: "noseelol.mc@gmail.com", p: "Smokekiki1!"},
    {u: "zhangjay1992@gmail.com", p: "Xz920202!!"},
    {u: "laxmanjtb@aol.com", p: "Ekajrox2311!"},
    {u: "rhysojanssen@gmail.com", p: "Getsmart18!"},
    {u: "ngomule@yahoo.com", p: "Pinknest@358"},
    {u: "leej49@gmail.com", p: "Password1!"},
    {u: "mercieralexa@gmail.com", p: "Goaggies!23"},
    {u: "Mattalex172@gmail.com", p: "Bluestar2!"},
    {u: "olivier.brittney@gmail.com", p: "M@cbeth24"},
    {u: "sschembri83@gmail.com", p: "Anasf_1983"},
    {u: "fshnthervr27@yahoo.com", p: "Kelsey1127@"},
    {u: "eg.design88@gmail.com", p: "Eg8325943068!"},
    {u: "lorival64100@gmail.com", p: "pnm3425D@"},
    {u: "kuczajgm@gmail.com", p: "Goettke1!"},
    {u: "lapat1984@gmail.com", p: "Nj152755$$J"},
    {u: "rnation87@gmail.com", p: "Rn@tion21"},
    {u: "bryantomko840@gmail.com", p: "Kellanj840!"},
    {u: "expressvpn.accgirr@gmail.com", p: "Bia2@AccGirr"},
    {u: "webmaster.karthik@gmail.com", p: "Ksaurjti@77"},
    {u: "vdhan333@gmail.com", p: "VVidhan123!!"},
    {u: "truunderground185@gmail.com", p: "NoAccess4You$"},
    {u: "aungshine35@gmail.com", p: "Blackshotcf1@"},
    {u: "weiricnip@gmail.com", p: "niptianyu88!"},
    {u: "garrett.manasco@gmail.com", p: "Denver18!"},
    {u: "murray.hayden21@gmail.com", p: "Vulnerablel!"},
    {u: "prashant.thankachan@gmail.com", p: "Ecologye74$"},
    {u: "yves.gaming@gmail.com", p: "Suisse99!"},
    {u: "manjunath@mysmindia.com", p: "Manju@1986"},
    {u: "mamounbelbachir@hotmail.com", p: "Mams1234$"},
    {u: "deannec_90@hotmail.com", p: "Donald23!"},
    {u: "denewbie@hotmail.com", p: "P@ssw0rd"},
    {u: "djptp11@hotmail.com", p: "Patrick11"},
    {u: "dark_wolf.0@hotmail.com", p: "Batman123!"},
    {u: "vedant_gupta_91@hotmail.com", p: "Italianpizza1!"},
    {u: "suave_0@hotmail.com", p: "AndreW!&07"},
    {u: "pbeatz2k10@gmail.com", p: "Backyard2019!"},
    {u: "birdycatalano@hotmail.com", p: "Birdycat99!"},
    {u: "brue81@hotmail.no", p: "4@Howells"},
    {u: "cambrake3@hotmail.com", p: "thebest1."},
    {u: "camerone52@hotmail.com", p: "gators5220"},
    {u: "camille.ln@hotmail.com", p: "Camille1!"},
    {u: "carymcdonald@hotmail.com", p: "Friday13!"},
    {u: "catherinegomis@hotmail.com", p: "Whatamango_01"},
    {u: "ron.j.acosta@gmail.com", p: "Acosta2261!"},
    {u: "christie_7000@hotmail.com", p: "Brazer77!"},
    {u: "n8fisher1234@gmail.com", p: "Fishtwins11!"},
    {u: "carymcdonald@hotmail.com", p: "Siseles14!"},
    {u: "christophmitph@hotmail.com", p: "ChrHol327#"},
    {u: "lizjperl@gmail.com", p: "Siouxsie123!!"},
    {u: "Jason.mulligan@gmail.com", p: "Marklar1!"},
    {u: "kievoa@yahookuu.id", p: "EVNYGTQ5X62E7DCNNXU7ZOB"},
    {u: "cadentjohnson04@gmail.com", p: "Bisd888810!"},
    {u: "sambeee@modujoa.com", p: "Express@A8285"},
    {u: "pamela@socialpop.com", p: "Mirandas534!"},
    {u: "pietro.gendotti@gmail.com", p: "W3sG3m22$"},
    {u: "amsdenje@gmail.com", p: "Angel841!"},
    {u: "jne468@gmail.com", p: "Drpepper7!"},
    {u: "oznakowanie@lukam.com.pl", p: "Sloneczko1!"},
    {u: "oakleybunce@gmail.com", p: "Guzman32%"},
    {u: "zayherrera77@gmail.com", p: "Isaiah5823!"},
    {u: "trussler2303@gmail.com", p: "IamTrent23!"},
    {u: "richvitkas@gmail.com", p: "ziuronys72"},
    {u: "soulsmith93@gmail.com", p: "gorillaz9"},
    {u: "zeynep1yavuz@yahoo.de", p: "Sinop57!"},
    {u: "moumita.hanra@gmail.com", p: "Mhmhsh23!"},
    {u: "eetu.e.vierinen@gmail.com", p: "K@tinkontti123"},
    {u: "krfenemor@hotmail.com", p: "Daisies20"},
    {u: "annika-ozi@outlook.com", p: "ameroula!26"},
    {u: "badthiliono27@gmail.com", p: "Palecroot9!"},
    {u: "muthu.kmr9100@gmail.com", p: "Darkness@13"},
    {u: "raeganlee16@gmail.com", p: "Rlee2016!"},
    {u: "anderalex13@gmail.com", p: "Alexander161!"},
    {u: "deanit@aol.com", p: "Avalanche42!"},
    {u: "vj1060@gmail.com", p: "ASutter24!"},
    {u: "athina03@hotmail.com", p: "Ath0306!"},
    {u: "rgibbs5169@yahoo.com", p: "Butterfly1!"},
    {u: "baldlemon17@gmail.com", p: "108003774Ee!"},
    {u: "wally.claassen@gmail.com", p: "Proactive1!!"},
    {u: "jczeban@nyc.rr.com", p: "305_Lesli3"},
    {u: "hinsonlau@gmail.com", p: "Hsl198384!"},
    {u: "nkharybina@nanopools.info", p: "Express@A8285"},
    {u: "alexvannoyd@gmail.com", p: "Ciocolata.88"},
    {u: "tomhill1978@outlook.com", p: "Chester#01"},
    {u: "neerajdana9@gmail.com", p: "Neeraj@1234"},
    {u: "jamesabigale12@gmail.com", p: "Lollol123!"},
    {u: "laluvaswani@gmail.com", p: "OmSaiRam108*"},
    {u: "eternity202@outlook.com", p: "Silent202**"},
    {u: "petersonjace80@gmail.com", p: "Starside22!"},
    {u: "owenrichards662@gmail.com", p: "634ne3eE!"},
    {u: "arthurhalbeck@yahoo.com", p: "Godzilla@12"},
    {u: "dean1113@live.com", p: "vipers23!"},
    {u: "blunt_sq_manhunt@hidmail.org", p: "822688524"},
    {u: "mamanil512@tasiw.com", p: "EK3NF729UTTPDKX6TFKMM5D"},
    {u: "jean.francois.beutin@gmail.com", p: "Leabeut10?"},
    {u: "sdrehbein@gmail.com", p: "Lovedance123!"},
    {u: "licakoy396@coswz.com", p: "EPRQ34HJVXLQ4DCMASRK3GX"},
    {u: "dfj5780@hotmail.com", p: "harper2681"},
    {u: "mphtkx@gmaiilku.id", p: "Premium@123"},
    {u: "shivamgulve4@gmail.com", p: "Shivam@0498"},
    {u: "artemiou1453@gmail.com", p: "Original21!"},
    {u: "kacis64158@gamening.com", p: "819264873"},
    {u: "thorbjth@gmail.com", p: "08Usybaf#"},
    {u: "tscastello@gmail.com", p: "C4Corvette!"},
    {u: "longhorns12m@gmail.com", p: "Codfish109$"},
    {u: "cm076807@gmail.com", p: "Rocafirm3!"},
    {u: "leeknsa@gmail.com", p: "asdeddZ12!"},
    {u: "mahdipu99@gmail.com", p: "@eeevpn1"},
    {u: "orlaquirke1@yahoo.co.uk", p: "rio045866068"},
    {u: "akash.toor14@hotmail.com", p: "Prada14!"},
    {u: "gorkov@sbb.rs", p: "Samsung1811!"},
    {u: "almacarolina@hotmail.com", p: "Arre171184#"},
    {u: "syo1212@outlook.com", p: "Am634454@"},
    {u: "mbuechel@live.com.au", p: "Boom!e62"},
    {u: "nortonsl@yahoo.com", p: "Missy2023!!"},
    {u: "h.namlah@gmail.com", p: "Hamadali1982@@"},
    {u: "juju1985@protonmail.com", p: "#d%#S76xn5$wvYj"},
    {u: "alewis6274@hotmail.com", p: "Fishkill2011!"},
    {u: "MARKVWELLONS@GMAIL.COM", p: "Murray@3512"},
    {u: "snikivee@gmail.com", p: "Leonard007!"},
    {u: "ramonavillarreal1@gmail.com", p: "Ramonavi11!"},
    {u: "zorse12292@gmail.com", p: "GTF0n00b!"},
    {u: "grosellroman@gmail.com", p: "Eliana23-05"},
    {u: "theobaern@gmail.com", p: "Pokemon300!"},
    {u: "eiganokuni@gmail.com", p: "murata8609"},
    {u: "rkhatibi@gmail.com", p: "fckgwrhqqq"},
    {u: "haynesstacy22@gmail.com", p: "Dhawonder@6"},
    {u: "nasonsam@hotmail.com", p: "Tenixtoll1."},
    {u: "Kumar.medishetty@gmail.com", p: "Goinside@1"},
    {u: "bruno.lemoine29@wanadoo.fr", p: "Papou1901&"},
    {u: "torfand@gmail.com", p: "45246449As!"},
    {u: "andre23454@gmail.com", p: "Nan-aki11"},
    {u: "supercancel97@gmail.com", p: "uHJr4B3v"},
    {u: "aduarte@tecnicil.com", p: "Suporte1*1"},
    {u: "davenewton@pes-global.com", p: "32Britain$"},
    {u: "unmight_worldly@hidmail.org", p: "377669736"},
    {u: "seif.odreeks@yahoo.com", p: "Ilovejesus2017+"},
    {u: "paul.a.gaier@gmail.com", p: "2TaD7uux0s_18"},
    {u: "allander.nathan@gmail.com", p: "Nick1983#"},
    {u: "ogpogolobbies@gmail.com", p: "DaculaGeoriga9322$"},
    {u: "serdarkaya322@gmail.com", p: "Smurfitkappa111!"},
    {u: "josephogas@gmail.com", p: "Cowboys24!"},
    {u: "rugyousum@digdig.org", p: "Methodforall321@"},
    {u: "genuine_o0-logic@hidmail.org", p: "422842317"},
    {u: "silvablnet@gmail.com", p: "Pepe2020@"},
    {u: "emhemmed.madi@gmail.com", p: "vesper.20"},
    {u: "nero912@gmail.com", p: "#Mockba2018"},
    {u: "workeian123@gmail.com", p: "Scooter15456!"},
    {u: "lawhan2578@gmail.com", p: "!zmfltm03"},
    {u: "nunomhr@gmail.com", p: "Sexyandinoit1994."},
    {u: "dopza86@gmail.com", p: "Qhdks@6974"},
    {u: "jorge001022@gmail.com", p: "Jorge*pab22"},
    {u: "bjones2893@gmail.com", p: "Dcshoes01!"},
    {u: "canteenwallacole@gmail.com", p: "Raptors2004$"},
    {u: "me.allwin@gmail.com", p: "Seople5757#"},
    {u: "tashijeshong11@gmail.com", p: "Johnwall2!"},
    {u: "oussama.bou00@gmail.com", p: "Azerty2525@@@"},
    {u: "lucasccipriano@gmail.com", p: "Lucas_ca10@"},
    {u: "defne.colak@gmail.com", p: "Defne648759!"},
    {u: "hamchoi0103@gmail.com", p: "Minhhai2023@"},
    {u: "Mattattack473@gmail.com", p: "Fatass001@"},
    {u: "laimechemohamedelamine85@gmail.com", p: "Nyc2018*"}
];

interface BankState {
  favorites: string[];
  copiedEmails: string[];
  copiedPasses: string[];
}

export const BankView = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [filter, setFilter] = useState<'all' | 'fav'>('all');
  const [state, setState] = useState<BankState>({ favorites: [], copiedEmails: [], copiedPasses: [] });

  useEffect(() => {
    // New key to reset state for new structure logic
    const saved = localStorage.getItem('shen_bank_v3');
    if (saved) setState(JSON.parse(saved));
  }, []);

  const save = (newState: BankState) => {
    setState(newState);
    localStorage.setItem('shen_bank_v3', JSON.stringify(newState));
  };

  const toggleFav = (email: string) => {
    const isFav = state.favorites.includes(email);
    const newFavs = isFav ? state.favorites.filter(e => e !== email) : [...state.favorites, email];
    save({ ...state, favorites: newFavs });
  };

  const handleCopy = async (text: string, type: 'email' | 'pass', email: string) => {
    await copyToClipboard(text);
    const typeLabel = type === 'email' ? 'ایمیل' : 'پسورد';
    showToast(`${typeLabel} کپی شد`);
    
    let newState = { ...state };
    if (type === 'email' && !state.copiedEmails.includes(email)) {
        newState.copiedEmails = [...state.copiedEmails, email];
    }
    if (type === 'pass' && !state.copiedPasses.includes(email)) {
        newState.copiedPasses = [...state.copiedPasses, email];
    }
    save(newState);
  };

  // Dedup logic
  const uniqueAccounts = Array.from(new Map(STATIC_ACCOUNTS.map(item => [item.u, item])).values());

  const filteredAccounts = filter === 'all' 
    ? uniqueAccounts 
    : uniqueAccounts.filter(acc => state.favorites.includes(acc.u));

  return (
    <div className="animate-fade-in">
      <SectionHeader 
        title="EXPRESS VPN BANK" 
        subtitle={`Total Accounts: ${uniqueAccounts.length}`}
        icon="fa-server"
      />

      <GuideBox>
          این بخش شامل لیستی از اکانت‌های عمومی <strong>Express VPN</strong> است که برای تست سلامت کلاینت‌ها گردآوری شده‌اند. برای استفاده، روی ایمیل یا پسورد کلیک کنید تا کپی شود.
      </GuideBox>

      {/* Controls - Convex Buttons */}
      <div className="flex gap-3 mb-6 p-1">
        <button 
          onClick={() => setFilter('all')}
          className={`px-6 py-3 rounded-xl text-xs font-black font-mono tracking-widest transition-all transform active:scale-95 duration-200 border-b-4 ${
            filter === 'all' 
            ? 'bg-gradient-to-br from-white to-gray-200 text-black border-gray-300 shadow-[0_4px_12px_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.05)]' 
            : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300'
          }`}
        >
          ALL ACCOUNTS
        </button>
        <button 
          onClick={() => setFilter('fav')}
          className={`px-6 py-3 rounded-xl text-xs font-black font-mono tracking-widest transition-all transform active:scale-95 duration-200 border-b-4 ${
            filter === 'fav' 
            ? 'bg-gradient-to-br from-[#1a1a1a] to-black text-yellow-500 border-yellow-600/50 shadow-[0_4px_12px_rgba(234,179,8,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]' 
            : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300'
          }`}
        >
          FAVORITES <i className="fa-solid fa-star ml-1"></i>
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4 mt-8">
        {filteredAccounts.map((acc, idx) => {
          const isFav = state.favorites.includes(acc.u);
          const isEmailCopied = state.copiedEmails.includes(acc.u);
          const isPassCopied = state.copiedPasses.includes(acc.u);
          const isFullyTried = isEmailCopied && isPassCopied;

          return (
            <Card key={idx} className={`relative overflow-visible group flex flex-row p-0 transition-colors ${isFullyTried ? 'border-gray-700 bg-[#0f0f11]' : ''}`}>
              
              {/* Plaque / Tag for Index */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border-x border-b border-white/10 px-4 py-1 rounded-b-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20">
                  <span className="text-[10px] font-black font-mono text-gray-500 tracking-widest">#{idx + 1}</span>
              </div>

              {/* Tested Vertical Strip (Right Side in RTL) */}
              {isFullyTried && (
                  <div className="w-8 bg-[#1a1a1a] border-l border-white/5 flex items-center justify-center shadow-inner rounded-r-xl">
                      <span className="text-[10px] text-green-500 font-black tracking-wider [writing-mode:vertical-rl] rotate-180 whitespace-nowrap py-4 drop-shadow-[0_0_5px_rgba(34,197,94,0.3)]">
                          امتحان شده
                      </span>
                  </div>
              )}

              <div className="flex-1 flex flex-col gap-3 relative z-10 p-5 pt-6">
                
                {/* Email Row */}
                <div 
                  onClick={() => handleCopy(acc.u, 'email', acc.u)}
                  className={`border border-white/5 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-blue-500/50 hover:bg-white/5 transition-all active:scale-[0.99] shadow-inner ${isEmailCopied ? 'bg-[#050505]' : 'bg-[#0a0a0a]'}`}
                >
                  <div className="overflow-hidden">
                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1 block">USERNAME</span>
                    <span className={`font-mono text-sm truncate block tracking-tight transition-colors ${isEmailCopied ? 'text-[#333]' : 'text-gray-200'}`}>
                        {acc.u}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-blue-400 transition-colors">
                      <i className={`fa-regular ${isEmailCopied ? 'fa-circle-check text-blue-900' : 'fa-copy'}`}></i>
                  </div>
                </div>

                {/* Password Row */}
                <div className="flex gap-3">
                   <div 
                    onClick={() => handleCopy(acc.p, 'pass', acc.u)}
                    className={`flex-1 border border-white/5 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-green-500/50 hover:bg-white/5 transition-all active:scale-[0.99] shadow-inner ${isPassCopied ? 'bg-[#050505]' : 'bg-[#0a0a0a]'}`}
                  >
                    <div className="overflow-hidden">
                      <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1 block">PASSWORD</span>
                      <span className={`font-mono text-sm font-bold truncate block tracking-wider transition-colors ${isPassCopied ? 'text-[#333]' : 'text-white'}`}>
                          {acc.p}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-green-400 transition-colors">
                        <i className={`fa-solid ${isPassCopied ? 'fa-circle-check text-green-900' : 'fa-key'}`}></i>
                    </div>
                  </div>
                  
                  {/* Fav Button */}
                  <button 
                    onClick={() => toggleFav(acc.u)}
                    className={`w-14 rounded-xl border flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                        isFav 
                        ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
                        : 'bg-[#0a0a0a] border-white/5 text-gray-700 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <i className={`${isFav ? 'fa-solid' : 'fa-regular'} fa-star text-lg`}></i>
                  </button>
                </div>

              </div>
            </Card>
          );
        })}
        {filteredAccounts.length === 0 && (
          <div className="text-center py-12 text-gray-600 text-sm border-2 border-dashed border-gray-800 rounded-2xl font-mono uppercase tracking-widest">
            NO DATA FOUND
          </div>
        )}
      </div>
    </div>
  );
};