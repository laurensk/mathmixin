using Mathmixin.Server.Database;
using Mathmixin.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mathmixin.Server.Controllers;

[ApiController]
[Route("notebooks")]
public class NotebookController : ControllerBase
{
    private readonly Context _context;

    public NotebookController(Context context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<List<Notebook>> GetAll()
    {
        return await _context.Notebooks.OrderBy(n => n.Name).ToListAsync();
    }

    [HttpPost]
    public async Task<Notebook> Save(Notebook model)
    {
        var notebook = await _context.Notebooks.Where(n => n.NotebookId == model.NotebookId).FirstOrDefaultAsync();

        if (notebook == null)
        {
            notebook = new Notebook();
            _context.Add(notebook);
        }

        notebook.Name = model.Name;

        await _context.SaveChangesAsync();
        return notebook;
    }

    [HttpDelete("{notebookId:long}")]
    public async Task<bool> Delete(long notebookId)
    {
        var notebook = await _context.Notebooks.Where(n => n.NotebookId == notebookId).FirstOrDefaultAsync();
        if (notebook == null) return false;

        var pages = await _context.Pages.Where(p => p.NotebookId == notebook.NotebookId).ToListAsync();

        _context.Remove(notebook);
        _context.RemoveRange(pages);

        await _context.SaveChangesAsync();

        return true;
    }

    [HttpGet("{notebookId:long}/pages")]
    public async Task<List<Page>> GetPages(long notebookId)
    {
        return await _context.Pages.Where(p => p.NotebookId == notebookId).OrderBy(p => p.Title).ToListAsync();
    }
}
