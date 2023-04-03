using Mathmixin.Server.Database;
using Mathmixin.Server.Entities;
using Mathmixin.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mathmixin.Server.Controllers;

[ApiController]
[Route("pages")]
public class PageController : ControllerBase
{
    private readonly Context _context;

    public PageController(Context context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<Page> Save(Page model)
    {
        var page = await _context.Pages.Where(p => p.PageId == model.PageId).FirstOrDefaultAsync();

        if (page == null)
        {
            page = new Page();
            _context.Add(page);
        }

        page.Title = model.Title;
        page.NotebookId = model.NotebookId;

        await _context.SaveChangesAsync();
        return page;
    }

    [HttpDelete("{pageId:long}")]
    public async Task<bool> Delete(long pageId)
    {
        var page = await _context.Pages.Where(p => p.PageId == pageId).FirstOrDefaultAsync();
        if (page == null) return false;

        _context.Remove(page);
        await _context.SaveChangesAsync();

        return true;
    }

    [HttpGet("{pageId:long}/content")]
    public async Task<ContentModel> GetContent(long pageId)
    {
        var page = await _context.Pages.Where(p => p.PageId == pageId).FirstOrDefaultAsync();
        return new ContentModel(page?.HtmlContent);
    }

    [HttpPost("{pageId:long}/content")]
    public async Task<bool> SaveContent(long pageId, [FromBody] ContentModel content)
    {
        var page = await _context.Pages.Where(p => p.PageId == pageId).FirstOrDefaultAsync();
        if (page == null) return false;

        page.HtmlContent = content.Content;

        await _context.SaveChangesAsync();
        return true;
    }
}
