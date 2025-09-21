using Core.Entities;
using Gateway.Employes;

namespace Gateway.Documents;

internal sealed class Document : AggregateRoot {
    public string Name { get; private set; }
    public DateTime ReceivedAt { get; init; }
    public DocumentType Type { get; private set; }
    public DocumentStatus Status { get; private set; }
    public DocumentDecision? Decision { get; private set; }

    public Guid SignerId { get; private set; }
    public DateTime ProcessedAt { get; private set; }
    public Employe ProcessedBy { get; private set; }

    public Document(string name, DocumentType type) {
        Name = name;
        Type = type;
        ReceivedAt = DateTime.UtcNow;
        Status = DocumentStatus.Initial;
    }

    public Document Proccess(Guid employeId) {
        SignerId = employeId;
        ProcessedAt = DateTime.UtcNow;
        return this;
    }

    public Document Archive() {
        TimeSpan archiveTreshold = TimeSpan.FromDays(365 * 2);
        bool readyToArchive = DateTime.UtcNow - ProcessedAt > archiveTreshold;
        if (!readyToArchive) {
            throw new InvalidOperationException("Document must be atleast 2 years old to be archived");
        }

        Status = DocumentStatus.Archived;
        return this;
    }

    public Document Accept(Guid aproverId) => Decide(aproverId, DocumentDecision.Accepted);

    public Document Reject(Guid aproverId) => Decide(aproverId, DocumentDecision.Rejected);

    Document Decide(Guid aproverId, DocumentDecision decision) {
        if (Type is not DocumentType.Request) {
            throw new InvalidOperationException("This document does not support approvals");
        }

        if (Status is DocumentStatus.Processed) {
            throw new InvalidOperationException("This document is already decided");
        }

        Decision = decision;
        return this;
    }
}

internal enum DocumentType {
    Document,
    Request,
    Invoice,
    Other,
}

internal enum DocumentStatus {
    Initial,
    Open,
    Processed,
    Archived,
}

internal enum DocumentDecision {
    None,
    Accepted,
    Rejected,
}
