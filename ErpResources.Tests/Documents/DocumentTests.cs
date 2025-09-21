using Gateway.Documents;
using Gateway.Employes;

namespace ErpResources.Tests.Documents;

public sealed class DocumentTests {
    static Document MockupDoc => new Document("Test Doc", DocumentType.Document);
    static Document MockupRequest => new Document("Vacation Request", DocumentType.Request);

    static Employe MockupEmploye = new Employe();

    [Fact]
    public void CreatingDocument_Should_HaveInitialStatus() {
        var doc = MockupDoc;

        doc.Name.Should().Be("Test Doc");
        doc.Type.Should().Be(DocumentType.Document);
        doc.Status.Should().Be(DocumentStatus.Initial);
        doc.Decision.Should().BeNull();
    }

    [Fact]
    public void ProcessingDocument_Should_SetProcessedProperties() {
        var doc = MockupDoc;

        doc.Proccess(MockupEmploye.Id);

        doc.Status.Should().Be(DocumentStatus.Processed);
        doc.SignerId.Should().Be(MockupEmploye.Id);
        doc.ProcessedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(5));
    }

    [Fact]
    public void ProcessingRequestWithoutDecision_Should_Throw() {
        var doc = MockupRequest;

        Action act = () => {
            doc.Proccess(MockupEmploye.Id);
        };

        act.Should().Throw();
    }

    [Fact]
    public void AcceptingRequestDocument_Should_SetDecision() {
        var doc = MockupRequest;

        doc.Accept(MockupEmploye.Id).Proccess(MockupEmploye.Id);

        doc.Decision.Should().Be(DocumentDecision.Accepted);
    }

    [Fact]
    public void RejectingRequestDocument_Should_SetDecision() {
        var doc = MockupRequest;

        doc.Reject(MockupEmploye.Id).Proccess(MockupEmploye.Id);

        doc.Decision.Should().Be(DocumentDecision.Rejected);
    }

    [Fact]
    public void AcceptingNonRequestDocument_Should_Throw() {
        var doc = new Document("Invoice", DocumentType.Invoice);
        doc.Proccess(Guid.NewGuid());

        Action act = () => doc.Accept(Guid.NewGuid());

        act.Should()
            .Throw<InvalidOperationException>()
            .WithMessage("This document does not support approvals");
    }

    [Fact]
    public void ArchivingDocument_BeforeTwoYears_Should_Throw() {
        var doc = new Document("Old Doc", DocumentType.Document);
        doc.Proccess(MockupEmploye.Id);

        Action act = () => doc.Archive();

        act.Should().Throw();
    }

    [Fact]
    public void ArchivingDocument_AfterTwoYears_Should_SetStatusArchived() {
        var doc = new Document("Old Doc", DocumentType.Document);
        doc.Proccess(MockupEmploye.Id);

        // simulate processed 3 years ago
        typeof(Document).GetProperty("ProcessedAt")!.SetValue(doc, DateTime.UtcNow.AddYears(-3));

        doc.Archive();

        doc.Status.Should().Be(DocumentStatus.Archived);
    }
}
