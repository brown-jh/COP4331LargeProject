
exports.createAuthentication =
function createAuthentication()
{
    const len = 6;
    let key = '';
    for(let i = 0; i < len; i++)
    {
        var ch = Math.floor((Math.random() * 33) + 1);
      	if (ch < 9)
        {
          key += ch;
        }
      	else
        {
          key += String.fromCharCode(ch + 56);
        }
        
    }

    return key;
}