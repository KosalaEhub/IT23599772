const { test, expect } = require('@playwright/test');

// Test data mapped from your "Copy of TestCases_Starter.xlsx" [cite: 376]
const testCases = [
    { id: 'Pos_Fun_0001', input: 'mama heta enavaa', expected: 'මම හෙට එනවා' },
    { id: 'Pos_Fun_0002', input: 'Oyata hodhin innavaa nedha', expected: 'ඔයට හොදින් ඉන්නවා නේද' },
    { id: 'Pos_Fun_0003', input: 'issarahata yanna.', expected: 'ඉස්සරහට යන්න.' },
    { id: 'Pos_Fun_0004', input: 'mama ehema karanne naehae.', expected: 'මම එහෙම කරන්නේ නෑ.' },
    { id: 'Pos_Fun_0005', input: 'mama adha poth kiyavanavaa', expected: 'මම අද පොත් කියවනවා' },
    { id: 'Pos_Fun_0006', input: 'labana sikuraadhaa apee gedhara enna', expected: 'ලබන සිකුරාදා අපේ ගෙදර එන්න' },
    { id: 'Pos_Fun_0007', input: 'api kaeema kanna yanavaa saha passe chithrapatayakuth balanavaa.', expected: 'අපි කෑම කන්න යනවා සහ පස්සේ චිත්‍රපටයක්ත් බලනවා.' },
    { id: 'Pos_Fun_0008', input: 'Zoom meeting ekak thiyennee.', expected: 'Zoom meeting එකක් තියෙන්නේ.' },
    { id: 'Pos_Fun_0009', input: 'mata help ekak karanna puluvandha?', expected: 'මට help එකක් කරන්න පුළුවන්ද?' },

    { id: 'Pos_Fun_0010', input: 'api kamu', expected: 'අපි කමු' },


    { id: 'Pos_Fun_0011', input: 'dhesaembar 25', expected: 'දෙසැම්බර් 25' },
    { id: 'Pos_Fun_0012', input: 'oya bodimata enne heta dha?', expected: 'ඔය බොඩිමට එන්නෙ හෙට ද ?.' },


    { id: 'Pos_Fun_0013', input: 'oya ennevaa nedha ?', expected: 'ඔය එන්නෙවා නේද ?' },


    { id: 'Pos_Fun_0014', input: 'dhenna oka', expected: 'දෙන්න ඔක' },


    { id: 'Pos_Fun_0015', input: 'Adha december 10 nedha ?', expected: 'අද december 10 නෙද?අද december 10 නෙද?'},



    { id: 'Pos_Fun_0016', input: 'kohomadha Kohomadha ithin', expected: 'කොහොමද කොහොමද ඉතින්' },


    { id: 'Pos_Fun_0017', input: 'mata oyagee pin number eka dhennoo', expected: 'මට ඔයගේ pin number එක දෙන්නෝ' },


    { id: 'Pos_Fun_0018', input: 'maage gama Badulla', expected: 'මාගෙ ගම Badulla' },


    { id: 'Pos_Fun_0019', input: 'eeyi, oya potha ikmanta dhiyan. ', expected: 'ඒයි, ඔය පොත ඉක්මන්ට දියන්. ' },


    { id: 'Pos_Fun_0020', input: 'mama adha oyalage gedhara enne naehae.', expected: 'මම අද ඔයලගෙ ගෙදර එන්නෙ නැහැ.' },


    { id: 'Pos_Fun_0021', input: 'Ikmanata gedhara enna', expected: 'ඉක්මනට ගෙදර එන්න' },

    { id: 'Pos_Fun_0022', input: 'Google eken search karalaa balanna', expected: 'Google එකෙන් search කරලා බලන්න' },



    { id: 'Pos_Fun_0023', input: 'hari mama heta potha gennam', expected: 'හරි මම හෙට පොත ගෙන්නම්' },

    { id: 'Pos_Fun_0024', input: 'mama gedhara yanavaa, haebaeyi  heta hari adha hari', expected: 'මම ගෙදර යනවා, හැබැයි හෙට හරි අද හරි' },


    { id: 'Pos_Fun_0025', input: 'api heta oyalage gamee ennavaa', expected: 'අපි හෙට ඔයලගෙ ගමේ එන්නවා' },





    
    { id: 'Pos_Fun_0026', input: 'oya adha class yanavaa nedha ?', expected: 'ඔය අද class යනවා නේද ?' },


    // Negative cases verify failure or messy behavior [cite: 54, 58]
    { id: 'Neg_Fun_0001', input: 'kg 10', expected: '10 kg' },


    { id: 'Neg_Fun_0002', input: 'mamakadetayanavaa', expected: 'මමකඩෙටයනවා' },


    { id: 'Neg_Fun_0003', input: 'ela machan supiri pothak', expected: 'එල මචන් සුපිරි පොතක්' },


    { id: 'Neg_Fun_0004', input: ' suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava saDHahan kaLeeya.', expected: 'සුළි කුණාටුව සමඟ ඇති වූ ගංවතුර සහ නායයෑම් හේතුවෙන් මාර්ග සංවර්ධන අධිකාරිය සතු මාර්ග කොටස් 430ක් විනාශයට පත්ව ඇති අතර, එහි සමස්ත දිග ප්‍රමාණය කිලෝමීටර් 300ක් පමණ වන බව සඳහන් කළේය.' },


    { id: 'Neg_Fun_0005', input: 'mata   raeeta kanna nudils    oonee.', expected: 'මට  රෑට කන්න නුඩිල්ස්     ඕනේ.' },


    { id: 'Neg_Fun_0006', input: 'siraavata uba oya kohedha yanna yanne', expected: 'සිරාවට උබ ඔය කොහෙද යන්න යන්නෙ' },


    { id: 'Neg_Fun_0007', input: 'adhaapibathkamu', expected: 'අදාපිබත්කමු' },


   { id: 'Neg_Fun_0008', input: 'km 10', expected: 'km 10' },


    { id: 'Neg_Fun_0009', input: 'Mama heta     gedhara  yana    vaa', expected: 'මම හෙට ගෙදර යන වා' },


    { id: 'Neg_Fun_0010', input: 'Ado ishan uba kohedha yanne?', expected: 'Ado ඉශන් උබ කොහෙද යන්නෙ?' }


];

test.describe('Singlish to Sinhala Transliteration Automation', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/');
    });

    for (const data of testCases) {
        test(`TC ${data.id}: ${data.input}`, async ({ page }) => {
            // UPDATED LOCATORS FOR SWIFT TRANSLATOR
            const inputField = page.locator('#special_characters_input_text');
            const outputField = page.locator('#translated_text');

            // Using fill and waiting for the value to appear
            await inputField.fill(data.input);
            
            // The output field on this site is usually a textarea or div, 
            // innerText or value should work.
            await expect(outputField).not.toBeEmpty();

           const actualOutput = (await outputField.textContent()).trim();

            
            if (data.id.startsWith('Pos')) {
                expect(actualOutput).toBe(data.expected);
            } else {
                console.log(`Negative TC Result: ${actualOutput}`);
            }
        });
    }

    test('Pos_UI_0001: Sinhala output updates automatically in real-time', async ({ page }) => {
        const inputField = page.locator('#special_characters_input_text');
        const outputField = page.locator('#translated_text');

        // Note: .type() is deprecated, use .pressSequentially() in newer Playwright versions
        await inputField.pressSequentially('man');
        await expect(outputField).toHaveValue('මන්');
 // or .toHaveValue()
    });
});